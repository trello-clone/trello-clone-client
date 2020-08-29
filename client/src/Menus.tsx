import React, { useState } from 'react';
import { MenuSurfaceAnchor, MenuItem, Menu } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import '@rmwc/menu/styles';
import '@rmwc/button/styles';

const Menus = () => {
    const [open, setOpen] = useState(false);
    return (
        <MenuSurfaceAnchor>
            <Menu open={open} onSelect={(evt) => console.log(evt.detail.index)} onClose={(evt) => setOpen(false)}>
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
            </Menu>

            <Button raised onClick={(evt) => setOpen(!open)}>
                Menu
            </Button>
        </MenuSurfaceAnchor>
    );
};

export default Menus;
