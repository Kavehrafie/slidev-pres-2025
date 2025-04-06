import { authConfig } from "./auth_config";
import { type PagesFunction } from "@cloudflare/workers-types";
interface Env {
  [key: string]: string;
}

// Defines a rule mapping a path prefix to a logical secret name
interface AuthRule {
  pathPrefix: string;
  secretName: string;
}

// Maps logical secret names to environment variable names
interface SecretsMap {
  [secretName: string]: string; // e.g., { default: "PRESENTATION_PASSWORD", admin: "ADMIN_SECRET" }
}

interface AuthConfig {
  auth?: {
    enabled?: boolean;
    secrets?: SecretsMap;
    rules?: AuthRule[];
    excludedPaths?: string[];
  };
}

// --- Helper functions ---
const unauthorizedResponse = (realm = "Restricted Area") => {
  console.log("Sending 401 Unauthorized response.");
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${realm}"`,
    },
  });
};

const internalServerErrorResponse = (message: string) => {
  console.error("Internal Server Error:", message);
  return new Response(`Internal Server Error:‌ ${message}`, {
    status: 500,
  });
};

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // --- 0. validate config ---
  const config = authConfig as AuthConfig; // Cast the imported

  // --- 1. check if basic auth enabled ---
  if (!config?.auth) {
    console.warn("Auth configuration is missing. Allowing request.");
    return next();
  }

  // --- 2. check for excluded paths ---
  const isExcluded = config.auth?.excludedPaths?.some((excludedPath: string) =>
    pathname.startsWith(excludedPath),
  );

  if (isExcluded) {
    console.log(`Path ${pathname} is excluded from Basic Auth.`);
    return next();
  }

  // --- 3. Find Matching Rule and Requred Secret ---
  if (!config.auth.rules || config.auth.rules.length === 0) {
    return internalServerErrorResponse("Auth rules are not configured.");
  }
  if (!config.auth.secrets) {
    return internalServerErrorResponse("Auth secrets map is not configured.");
  }

  let matchedRule: AuthRule | undefined;
  for (const rule of config.auth.rules) {
    if (pathname.startsWith(rule.pathPrefix)) {
      matchedRule = rule;
      break;
    }
  }

  if (!matchedRule) {
    console.warn(
      `No matching auth rule found for path: ${pathname}. Denying access.`,
    );
    return unauthorizedResponse();
  }

  const logicalSecretName = matchedRule?.secretName || "SECRET";
  const envVarName = config.auth.secrets[logicalSecretName];

  if (!envVarName) {
    return internalServerErrorResponse(
      `Secret name "${logicalSecretName}" defined in rule for "${matchedRule?.pathPrefix}" not found in secrets map.`,
    );
  }

  const secretValue = env[envVarName];

  if (!secretValue) {
    return internalServerErrorResponse(
      `Required environment variable "${envVarName}" for path "${pathname}" is not set.`,
    );
  }

  // --- 4. Check for Secret Query Parameter ---
  const urlSecret = url.searchParams.get("secret");
  if (urlSecret === secretValue) {
    console.log(
      `Access granted via secret query parameter for path: ${pathname}`,
    );
    return next();
  }

  // --- 5. Check Basic Authetication Header ---
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    console.log(
      `No/Invalid Basic Auth header or secret param for path: ${pathname}.`,
    );
    return unauthorizedResponse(`Access to ${matchedRule?.pathPrefix}`);
  }

  try {
    const base64Credentials = authHeader.substring(6);
    const decode = atob(base64Credentials);
    const colonIndex = decode.indexOf(":");
    if (colonIndex === -1) {
      console.log("Malformed Basic Auth credentials (no colon).");
      return unauthorizedResponse(`Access to ${matchedRule?.pathPrefix}`);
    }

    // we only care about the password
    const providePassword = decode.substring(colonIndex + 1);
    if (providePassword === secretValue) {
      console.log(`Basic Auth successful for path: ${pathname}`);
      return next();
    } else {
      console.log("Basic Auth failed: Incorrect password.");
      return unauthorizedResponse(`Access to ${matchedRule?.pathPrefix}`);
    }
  } catch (e) {
    console.error("Error decoding Basic Auth credentials:", e);
    return unauthorizedResponse(`Access to ${matchedRule?.pathPrefix}`);
  }
};
