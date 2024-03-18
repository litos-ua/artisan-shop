import React from 'react';

export function LogOutButton({ onLogOut }) {
    const handleLogOut = () => {
        onLogOut();
    };

    return (
        <div className="authbuttons">
            <button className="header__btn header__btn_common header__btn_primary" onClick={handleLogOut}>
                Вийти
            </button>
        </div>
    );
}
