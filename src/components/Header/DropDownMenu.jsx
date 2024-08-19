

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, IconButton } from "@mui/material";
// import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
// import { fetchProductsByCategory } from "../../api";
// import { setProductsByCategory } from "../../ducks"
// import { ROUTE } from "../../router";
//
// export function DropDownMenu({ categories }) {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [menuIcon, setMenuIcon] = useState(<MenuIcon />);
//     const dropdownRef = useRef(null);
//     const categoryButtonRefs = useRef(Array(categories.length).fill(null));
//     const [hoveredCategory, setHoveredCategory] = useState("");
//     const [hoveredProducts, setHoveredProducts] = useState([]);
//     const [productMenuPosition, setProductMenuPosition] = useState({ top: 0 });
//     const navigate = useNavigate();
//     const screenHeight = window.innerHeight;
//     const dispatch = useDispatch();
//     const productsByCategory = useSelector((state) => state.productsByCategory);
//
//     //console.log('categoriesDrop:', categories);
//
//     useEffect(() => {
//         categoryButtonRefs.current = categoryButtonRefs.current.map((_, index) => categoryButtonRefs.current[index] || React.createRef());
//     }, [categories.length]);
//
//     useEffect(() => {
//         const handleMouseLeave = () => {
//             setShowDropdown(false);
//             setHoveredCategory("");
//             setHoveredProducts([]);
//             setMenuIcon(<MenuIcon />);
//         };
//
//         const refCurrent = dropdownRef.current;
//
//         if (refCurrent) {
//             refCurrent.addEventListener("mouseleave", handleMouseLeave);
//         }
//
//         return () => {
//             if (refCurrent) {
//                 refCurrent.removeEventListener("mouseleave", handleMouseLeave);
//             }
//         };
//     }, [dropdownRef]);
//
//
//     const handleListItemHover = async (category, index) => {
//         //console.log('ListItemHover_category:', category, ' , ListItemHover_index:', index);
//
//         if (category !== "Products") {
//             setHoveredCategory(category);
//
//             if (!productsByCategory[category.id]) { // Check if products are already in Redux store
//                 try {
//                     const categoryId = category.id ?? '1';
//                     const products = await fetchProductsByCategory(categoryId);
//                     dispatch(setProductsByCategory({ categoryId: category.id, products })); // Dispatch action to set products by category
//                     setHoveredProducts(products); // Update hoveredProducts state after dispatching the action
//
//                     // Ensure categoryButtonRefs.current[index] exists before accessing its properties
//                     if (categoryButtonRefs.current[index]) {
//                         const categoryButtonRect = categoryButtonRefs.current[index].getBoundingClientRect();
//                         const productMenuTop = categoryButtonRect.top + categoryButtonRect.height - (750 * 100 / screenHeight);
//                         setProductMenuPosition({ top: productMenuTop });
//                     } else {
//                         //console.warn(`Category button ref not found for index ${index}`);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching products:', error);
//                     setHoveredProducts([]);
//                 }
//             } else {
//                 setHoveredProducts(productsByCategory[category.id]); // Set products from Redux store
//             }
//         }
//     };
//
//
//     const handleCurrentItemHover = (productKey) => {
//         navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
//     };
//
//     const handleCategoryClick = (category) => {
// //        navigate(`${ROUTE.CATEGORY_CURRENT.replace(":category", category.name)}`); //rangeOfProducts
//         //console.log('CategoryID_out:', category.id);
//         navigate(`${ROUTE.CATEGORY_CURRENT.replace(":category", category.id)}`) //API
//     };
//
//     const handleButtonHover = () => {
//         setShowDropdown(prevState => !prevState);
//         setMenuIcon(prevIcon => (!showDropdown ? <CloseIcon /> : <MenuIcon />));
//     };
//
//     return (
//         <Box sx={{ position: "relative" }} ref={dropdownRef}>
//             <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 sx={{
//                     mr: 2,
//                     color: 'white',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.3s ease',
//                     whiteSpace: 'nowrap',
//                 }}
//                 className={`header__btn  header__btn_secondary header__dropdown_component ${
//                     showDropdown ? 'active' : ''
//                 }`}
//                 onClick={handleButtonHover}
//             >
//                 {menuIcon}
//             </IconButton>
//
//             {showDropdown && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "100%",
//                         left: "0%",
//                         display: "block",
//                         backgroundColor: "rgba(84, 102, 180, 0.9)",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                         marginTop: "-0.5vw",
//                         marginLeft: "0.2vw",
//                         zIndex: 1,
//                     }}
//                     ref={dropdownRef}
//                 >
//                     {categories.map((category, index) => (
//                         <IconButton
//                             key={category.id}
//                             onMouseEnter={() => handleListItemHover(category, index)} // Pass category object to handleListItemHover
//                             onClick={() => handleCategoryClick(category)}
//                             ref={(el) => (categoryButtonRefs.current[index] = el)}
//                             sx={{
//                                 padding: "8px",
//                                 fontSize: "24px",
//                                 color: "#333",
//                                 cursor: "pointer",
//                                 transition: "background-color 0.3s ease",
//                                 whiteSpace: "normal",
//                                 wordWrap: "break-word",
//                                 "&:hover": {
//                                     backgroundColor: "#f5f5f5",
//                                 },
//                             }}
//                         >
//                             {category.name}
//                         </IconButton>
//                     ))}
//
//                     {hoveredCategory !== "" && (
//                         <Box
//                             sx={{
//                                 position: "absolute",
//                                 top: `${productMenuPosition.top*100/screenHeight}vh`,
//                                 left: "100%",
//                                 transform: "translateY(-5%)",
//                                 display: "block",
//                                 backgroundColor: "rgba(84, 102, 180, 0.9)",
//                                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                                 border: "1px solid #ddd",
//                                 borderRadius: "4px",
//                                 marginTop: "-0.5vw",
//                                 marginLeft: "0.2vw",
//                                 zIndex: 1,
//                             }}
//                         >
//                             {hoveredProducts.map((product) => (
//                                 <IconButton
//                                     key={product.id}
//                                     onClick={() => handleCurrentItemHover(product.id)} //'id' for API, 'name' for local config
//                                     sx={{
//                                         padding: "8px",
//                                         fontSize: "24px",
//                                         color: "#333",
//                                         cursor: "pointer",
//                                         transition: "background-color 0.3s ease",
//                                         whiteSpace: "nowrap",
//                                         wordWrap: "break-word",
//                                         "&:hover": {
//                                             backgroundColor: "#ece3a4",
//                                         },
//                                     }}
//                                 >
//                                     {product.name}
//                                 </IconButton>
//                             ))}
//                         </Box>
//                     )}
//                 </Box>
//             )}
//         </Box>
//     );
// }

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { fetchProductsByCategory } from "../../api";
import { setProductsByCategory } from "../../ducks";
import { ROUTE } from "../../router";

export function DropDownMenu({ categories }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuIcon, setMenuIcon] = useState(<MenuIcon />);
    const dropdownRef = useRef(null);
    const categoryButtonRefs = useRef([]);
    const [hoveredCategory, setHoveredCategory] = useState("");
    const [hoveredProducts, setHoveredProducts] = useState([]);
    const [productMenuPosition, setProductMenuPosition] = useState({ top: 0 });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productsByCategory = useSelector((state) => state.productsByCategory);

    // Ensure categoryButtonRefs has the correct length
    useEffect(() => {
        categoryButtonRefs.current = categoryButtonRefs.current.slice(0, categories.length);
    }, [categories.length]);

    // Handle mouse leave to hide dropdown
    useEffect(() => {
        const handleMouseLeave = () => {
            setShowDropdown(false);
            setHoveredCategory("");
            setHoveredProducts([]);
            setMenuIcon(<MenuIcon />);
        };

        const refCurrent = dropdownRef.current;
        if (refCurrent) {
            refCurrent.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [dropdownRef]);

    const handleListItemHover = async (category, index) => {
        if (category !== "Products") {
            setHoveredCategory(category);

            if (!productsByCategory[category.id]) {
                try {
                    const categoryId = category.id ?? '1';
                    const products = await fetchProductsByCategory(categoryId);
                    dispatch(setProductsByCategory({ categoryId: category.id, products }));
                    setHoveredProducts(products);

                    if (categoryButtonRefs.current[index]) {
                        const categoryButtonRect = categoryButtonRefs.current[index].getBoundingClientRect();
                        const productMenuTop = categoryButtonRect.top + window.scrollY;
                        setProductMenuPosition({ top: productMenuTop });
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                    setHoveredProducts([]);
                }
            } else {
                setHoveredProducts(productsByCategory[category.id]);

                if (categoryButtonRefs.current[index]) {
                    const categoryButtonRect = categoryButtonRefs.current[index].getBoundingClientRect();
                    const productMenuTop = categoryButtonRect.top + window.scrollY;
                    setProductMenuPosition({ top: productMenuTop });
                }
            }
        }
    };

    const handleCurrentItemHover = (productKey) => {
        navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
    };

    const handleCategoryClick = (category) => {
        navigate(`${ROUTE.CATEGORY_CURRENT.replace(":category", category.id)}`);
    };

    const handleButtonHover = () => {
        setShowDropdown(prevState => !prevState);
        setMenuIcon(prevIcon => (!showDropdown ? <CloseIcon /> : <MenuIcon />));
    };

    return (
        <Box sx={{ position: "relative" }} ref={dropdownRef}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                    mr: 2,
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    whiteSpace: 'nowrap',
                }}
                className={`header__btn  header__btn_secondary header__dropdown_component ${
                    showDropdown ? 'active' : ''
                }`}
                onClick={handleButtonHover}
            >
                {menuIcon}
            </IconButton>

            {showDropdown && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: "0%",
                        display: "block",
                        backgroundColor: "rgba(84, 102, 180, 0.9)",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        marginTop: "-0.5vw",
                        marginLeft: "0.2vw",
                        zIndex: 1,
                    }}
                    ref={dropdownRef}
                >
                    {categories.map((category, index) => (
                        <IconButton
                            key={category.id}
                            onMouseEnter={() => handleListItemHover(category, index)}
                            onClick={() => handleCategoryClick(category)}
                            ref={(el) => (categoryButtonRefs.current[index] = el)}
                            sx={{
                                padding: "8px",
                                fontSize: "24px",
                                color: "#333",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        >
                            {category.name}
                        </IconButton>
                    ))}

                    {hoveredCategory && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: `${productMenuPosition.top}px`,
                                left: "100%",
                                display: "block",
                                backgroundColor: "rgba(84, 102, 180, 0.9)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                zIndex: 1,
                            }}
                        >
                            {hoveredProducts.map((product) => (
                                <IconButton
                                    key={product.id}
                                    onClick={() => handleCurrentItemHover(product.id)}
                                    sx={{
                                        padding: "8px",
                                        fontSize: "24px",
                                        color: "#333",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        whiteSpace: "nowrap",
                                        wordWrap: "break-word",
                                        "&:hover": {
                                            backgroundColor: "#ece3a4",
                                        },
                                    }}
                                >
                                    {product.name}
                                </IconButton>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}






