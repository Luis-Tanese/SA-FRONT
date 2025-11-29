import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus, IconX } from "@tabler/icons-react";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import Footer from "../components/layout/Footer";
import api from "../services/api";
import styles from "../styles/CompraPage.module.css";
import PceDeviceImg from "../images/PCEimg.png"; 

const CompraPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [cardData, setCardData] = useState({
        number: "",
        expiry: "",
        cvc: ""
    });

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "P.C.E", desc: "Contador de fluxo", price: 460.0 },
    ]);

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            alert("Você precisa estar logado para comprar.");
            navigate("/login");
        } else {
            setCurrentUser(session);
        }
    }, [navigate]);

    const totalValue = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const validateCard = () => {
        const numClean = cardData.number.replace(/\s/g, "");
        if (numClean.length < 13 || isNaN(numClean)) {
            alert("Número de cartão inválido.");
            return false;
        }
        if (cardData.expiry.length < 4) {
            alert("Data de validade inválida.");
            return false;
        }
        if (cardData.cvc.length < 3) {
            alert("CVC inválido.");
            return false;
        }
        return true;
    };

    const handleCheckout = async () => {
        if (!validateCard()) return;
        
        setLoading(true);
        try {
            // Itens ganham IDs únicos dentro do createOrder no api.js
            await api.createOrder(currentUser.id, cartItems, totalValue);
            
            alert("Compra realizada! Seus dispositivos estão no seu perfil. Você pode renomeá-los lá para distingui-los.");
            navigate("/perfil"); 
        } catch (error) {
            alert("Erro ao processar compra: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addItem = () => {
        setCartItems([...cartItems, { id: Date.now(), name: "P.C.E", desc: "Contador de fluxo", price: 460.0 }]);
    };

    const removeItem = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    return (
        <div className={styles.pageContainer}>
            <NavbarVoltar />

            <div className={styles.contentWrapper}>
                <div className={styles.cardsContainer}>
                    {/* Carrinho */}
                    <div className={styles.cartCard}>
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Adicionar mais P.C.E's"
                                className={styles.searchInput}
                                readOnly
                            />
                            <button className={styles.addBtn} onClick={addItem}>
                                <IconPlus size={20} />
                            </button>
                        </div>

                        <div className={styles.itemsList}>
                            {cartItems.map((item, index) => (
                                <div key={index} className={styles.itemRow}>
                                    <img src={PceDeviceImg} alt="PCE Device" className={styles.itemImg} />
                                    <div className={styles.itemInfo}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemDesc}>{item.desc}</span>
                                    </div>
                                    <button className={styles.removeBtn} onClick={() => removeItem(index)}>
                                        <IconX size={18} color="white" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryFooter}>
                            <div className={styles.summaryCol}>
                                <span className={styles.summaryLabel}>Valor Total:</span>
                                <span className={styles.totalPrice}>
                                    R$: {totalValue.toFixed(2).replace(".", ",")}
                                </span>
                            </div>
                            <div className={styles.summaryCol}>
                                <span className={styles.summaryLabel}>Unidades:</span>
                                <span className={styles.totalUnits}>
                                    {cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pagamento */}
                    <div className={styles.paymentCard}>
                        <div className={styles.cardIconsRow}>
                            <div className={styles.cardIconPlaceholder}>VISA</div>
                            <div className={styles.cardIconPlaceholder}>MC</div>
                            <div className={styles.cardIconPlaceholder}>ELO</div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Número do Cartão</label>
                            <input 
                                type="text" 
                                name="number"
                                value={cardData.number}
                                onChange={handleCardChange}
                                className={styles.input} 
                                placeholder="0000 0000 0000 0000" 
                                maxLength={19}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Validade</label>
                                <input 
                                    type="text" 
                                    name="expiry"
                                    value={cardData.expiry}
                                    onChange={handleCardChange}
                                    className={styles.input} 
                                    placeholder="MM/AA" 
                                    maxLength={5}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>CVC</label>
                                <input 
                                    type="text" 
                                    name="cvc"
                                    value={cardData.cvc}
                                    onChange={handleCardChange}
                                    className={styles.input} 
                                    placeholder="123" 
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <div className={styles.paymentActions}>
                            <button 
                                className={styles.btnFinish} 
                                onClick={handleCheckout} 
                                disabled={loading || cartItems.length === 0}
                            >
                                {loading ? "Processando..." : "Finalizar Compra"}
                            </button>
                            <button className={styles.btnCancel} onClick={() => navigate("/")}>
                                Cancelar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompraPage;