import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup, INavLink } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const navStyles: Partial<INavStyles> = {
    root: {
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflow: 'auto',
        paddingTop: '10vh',
        backgroundColor: '#F5EEEE'
    }
};

const navLinkGroups: INavLinkGroup[] = [
    {
        name: "Demo",
        links: [
            {
                key: "Product",
                name: "Products",
                url: "products",
                icon: "BulletedList",
            },
            {
                key: "CuadroMando",
                name: "Cuadro Mando",
                url: "cuadro-mando",
                icon: "BarChartVerticalFilter",
            },
            {
                key: "Telerik",
                name: "Telerik",
                url: "telerik",
                icon: "Settings",
            },
        ],
    },
];

export const Sidebar: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const _clickNavigate = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        if (ev) {
            ev.preventDefault();
            if (item) {
                navigate(item.url);
            }
        }
    }

    initializeIcons();
    return (
        <Nav
            styles={navStyles}
            ariaLabel='sidebar'
            groups={navLinkGroups}
            onLinkClick={_clickNavigate}
        />
    );
};