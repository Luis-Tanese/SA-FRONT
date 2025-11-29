/* src/services/api.js */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Inicializa dados no LocalStorage se não existirem
const initializeMockData = () => {
    if (!localStorage.getItem("fluxity_users")) {
        localStorage.setItem("fluxity_users", JSON.stringify([]));
    }
    if (!localStorage.getItem("fluxity_orders")) {
        localStorage.setItem("fluxity_orders", JSON.stringify([]));
    }
    if (!localStorage.getItem("fluxity_pces")) {
        localStorage.setItem("fluxity_pces", JSON.stringify([]));
    }
};

initializeMockData();

const api = {
    // --- Sessão e Autenticação ---
    getSession: () => {
        const session = localStorage.getItem("fluxity_session");
        return session ? JSON.parse(session) : null;
    },

    login: async (email, password) => {
        await delay(500);
        const users = JSON.parse(localStorage.getItem("fluxity_users"));
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("fluxity_session", JSON.stringify(user));
            return { success: true, user };
        }
        throw new Error("E-mail ou senha inválidos.");
    },

    register: async (userData) => {
        await delay(500);
        const users = JSON.parse(localStorage.getItem("fluxity_users"));
        const exists = users.find((u) => u.email === userData.email);

        if (exists) {
            throw new Error("E-mail já cadastrado.");
        }

        const newUser = { 
            ...userData, 
            id: Date.now(),
            avatar: "", // Campo para URL da foto
            banner: ""  // Campo para URL do banner
        };
        users.push(newUser);
        localStorage.setItem("fluxity_users", JSON.stringify(users));

        localStorage.setItem("fluxity_session", JSON.stringify(newUser));
        return { success: true, user: newUser };
    },

    logout: () => {
        localStorage.removeItem("fluxity_session");
    },

    // --- Usuários e Empresas ---
    updateUser: async (userId, updatedData) => {
        await delay(500);
        const users = JSON.parse(localStorage.getItem("fluxity_users"));
        const index = users.findIndex((u) => u.id === userId);

        if (index !== -1) {
            const userType = users[index].type;
            // Atualiza mantendo ID e Type
            const updatedUser = { ...users[index], ...updatedData, type: userType };
            
            users[index] = updatedUser;
            localStorage.setItem("fluxity_users", JSON.stringify(users));
            
            // Atualiza sessão se for o usuário logado
            const session = JSON.parse(localStorage.getItem("fluxity_session"));
            if (session && session.id === userId) {
                localStorage.setItem("fluxity_session", JSON.stringify(updatedUser));
            }
            
            return { success: true, user: updatedUser };
        }
        throw new Error("Usuário não encontrado.");
    },

    // --- Compras e Produtos ---
    createOrder: async (userId, items, total) => {
        await delay(800);
        const orders = JSON.parse(localStorage.getItem("fluxity_orders"));
        
        // Adiciona um uniqueId para cada item para permitir renomeação individual
        const itemsWithUniqueIds = items.map(item => ({
            ...item,
            uniqueId: Date.now() + Math.random().toString(36).substr(2, 9),
            customName: item.name // Nome inicial padrão
        }));

        const newOrder = {
            id: Date.now(),
            userId,
            items: itemsWithUniqueIds,
            total,
            date: new Date().toISOString(),
        };

        orders.push(newOrder);
        localStorage.setItem("fluxity_orders", JSON.stringify(orders));
        return { success: true, order: newOrder };
    },

    getUserOrders: async (userId) => {
        await delay(300);
        const orders = JSON.parse(localStorage.getItem("fluxity_orders"));
        return orders.filter((order) => order.userId === userId);
    },

    // Função para renomear um item comprado (PCE)
    updateOrderItemName: async (userId, orderId, itemUniqueId, newName) => {
        await delay(300);
        const orders = JSON.parse(localStorage.getItem("fluxity_orders"));
        
        const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);
        if (orderIndex !== -1) {
            const itemIndex = orders[orderIndex].items.findIndex(i => i.uniqueId === itemUniqueId);
            if (itemIndex !== -1) {
                orders[orderIndex].items[itemIndex].customName = newName;
                localStorage.setItem("fluxity_orders", JSON.stringify(orders));
                return { success: true };
            }
        }
        throw new Error("Item não encontrado.");
    }
};

export default api;