/* src/services/api.js */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// Helper to get auth token from localStorage
const getToken = () => {
    return localStorage.getItem("fluxity_token");
};

// Helper to save auth token to localStorage
const setToken = (token) => {
    if (token) {
        localStorage.setItem("fluxity_token", token);
    } else {
        localStorage.removeItem("fluxity_token");
    }
};

// Helper to save session to localStorage (for quick access without API call)
const setSessionCache = (user) => {
    if (user) {
        localStorage.setItem("fluxity_session", JSON.stringify(user));
    } else {
        localStorage.removeItem("fluxity_session");
    }
};

// Helper to get cached session
const getSessionCache = () => {
    const session = localStorage.getItem("fluxity_session");
    return session ? JSON.parse(session) : null;
};

// Helper for making API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Erro na requisição.");
    }

    return data;
};

const api = {
    // --- Sessão e Autenticação ---
    getSession: () => {
        // Return cached session for synchronous access
        // The app should validate this with the server on load
        return getSessionCache();
    },

    // Validate session with server (async version)
    validateSession: async () => {
        const token = getToken();
        if (!token) {
            setSessionCache(null);
            return null;
        }

        try {
            const data = await apiRequest("/auth/session");
            if (data.user) {
                setSessionCache(data.user);
                return data.user;
            }
            setToken(null);
            setSessionCache(null);
            return null;
        } catch {
            setToken(null);
            setSessionCache(null);
            return null;
        }
    },

    login: async (email, password) => {
        const data = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (data.success && data.token) {
            setToken(data.token);
            setSessionCache(data.user);
        }

        return { success: true, user: data.user };
    },

    register: async (userData) => {
        const data = await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });

        if (data.success && data.token) {
            setToken(data.token);
            setSessionCache(data.user);
        }

        return { success: true, user: data.user };
    },

    logout: async () => {
        try {
            await apiRequest("/auth/logout", { method: "POST" });
        } catch {
            // Ignore errors on logout
        }
        setToken(null);
        setSessionCache(null);
    },

    // --- Usuários e Empresas ---
    updateUser: async (userId, updatedData) => {
        const data = await apiRequest(`/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
        });

        if (data.success && data.user) {
            // Update cached session if it's the current user
            const cachedSession = getSessionCache();
            if (cachedSession && cachedSession.id === userId) {
                setSessionCache(data.user);
            }
        }

        return data;
    },

    // --- Compras de PCEs ---
    createOrder: async (userId, items, total) => {
        const data = await apiRequest("/orders", {
            method: "POST",
            body: JSON.stringify({ items, total }),
        });

        return data;
    },

    // Buscar pedidos do usuário
    getUserOrders: async (userId) => {
        return await apiRequest("/orders");
    },

    // --- PCEs Comprados (Não Cadastrados) ---

    // Buscar PCEs comprados pelo usuário (todos)
    getUserPurchasedPces: async (userId) => {
        return await apiRequest("/pces/purchased");
    },

    // Buscar apenas PCEs NÃO cadastrados
    getUnregisteredPces: async (userId) => {
        return await apiRequest("/pces/unregistered");
    },

    // Contar PCEs (total comprados, cadastrados, não cadastrados)
    getPceStats: async (userId) => {
        return await apiRequest("/pces/stats");
    },

    // --- PCEs Cadastrados ---

    // Cadastrar um PCE (usa um slot de PCE comprado não cadastrado)
    registerPCE: async (userId, pceData) => {
        return await apiRequest("/pces/register", {
            method: "POST",
            body: JSON.stringify(pceData),
        });
    },

    // Buscar todos os PCEs cadastrados de um usuário
    getUserPCEs: async (userId) => {
        return await apiRequest("/pces");
    },

    // Buscar um PCE específico por ID
    getPCEById: async (pceId) => {
        return await apiRequest(`/pces/${pceId}`);
    },

    // Atualizar um PCE
    updatePCE: async (userId, pceId, updatedData) => {
        return await apiRequest(`/pces/${pceId}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
        });
    },

    // Deletar um PCE (libera o slot para cadastrar novamente)
    deletePCE: async (userId, pceId) => {
        return await apiRequest(`/pces/${pceId}`, {
            method: "DELETE",
        });
    },

    // Renomear PCE (atalho)
    renamePCE: async (userId, pceId, newName) => {
        return await apiRequest(`/pces/${pceId}/rename`, {
            method: "PATCH",
            body: JSON.stringify({ nome: newName }),
        });
    },

    // --- Funções auxiliares legadas (mantidas por compatibilidade) ---
    addPCE: async (userId, pceData) => {
        // Agora usa registerPCE
        return api.registerPCE(userId, pceData);
    },
};

export default api;
