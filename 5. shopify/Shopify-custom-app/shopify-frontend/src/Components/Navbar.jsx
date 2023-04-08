import { TopBar } from "@shopify/polaris";
import { LogOutMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

function Navbar({ toggle }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { loggedInShop } = useSelector((state) => state.shopLogin);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");

    toggle();
  }, [toggle]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:5000/";
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: "Logout", icon: LogOutMinor, onAction: handleLogout },
          ],
        },
      ]}
      name={loggedInShop && loggedInShop?.shopName}
      detail="My App"
      initials={
        loggedInShop.shopName && loggedInShop?.shopName[0].toUpperCase()
      }
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );
}

export default Navbar;
