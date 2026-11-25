// 请求基础地址
export const BASE_URL = "http://localhost:8000";

// 读取 token：每次请求时动态读取，避免模块加载时固化
const getToken = (): string => {
  if (typeof window === "undefined") {
    return "";
  }
  const raw = localStorage.getItem("token");
  if (!raw) {
    return "";
  }
  // token 可能是纯字符串，也可能是历史遗留的 JSON 字符串，做兼容处理
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : "";
  } catch {
    return raw;
  }
};

// 构造请求头：每次请求时重新生成，携带最新 token
const buildHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// 请求客户端
// endpoint ：请求路径
export async function postRequest(endpoint: string, data?: any) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: buildHeaders(),
    method: "POST",
    body: JSON.stringify(data),
  });
  // 请求失败处理
  if (!response.ok) {
    // statusText ：响应状态码的文本描述
    throw new Error(response.statusText || "请求失败");
  }

  // 响应体内容类型 ：json
  return response.json();
}

async function putRequest(endpoint: string, data?: any) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: buildHeaders(),
    method: "PUT",
    body: JSON.stringify(data),
  });
  // 请求失败处理
  if (!response.ok) {
    // statusText ：响应状态码的文本描述
    throw new Error(response.statusText || "请求失败");
  }

  // 响应体内容类型 ：json
  return response.json();
}

async function deleteRequest(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: buildHeaders(),
    method: "DELETE",
  });
  // 请求失败处理
  if (!response.ok) {
    // statusText ：响应状态码的文本描述
    throw new Error(response.statusText || "请求失败");
  }

  // 响应体内容类型 ：json
  return response.json();
}

async function getRequest(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: buildHeaders(),
    method: "GET",
  });

  console.log("getRequest", response);

  // 请求失败处理
  if (!response.ok) {
    // statusText ：响应状态码的文本描述
    throw new Error(response.statusText || "请求失败");
  }

  // 响应体内容类型 ：json
  return response.json();
}

const request = {
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
  get: getRequest,
};

export default request;
