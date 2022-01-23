import React, { useContext } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

import {
    AnimationClassNames,
    mergeStyles,
    getTheme,
    mergeStyleSets,
} from "@fluentui/style-utilities";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Icon } from "@fluentui/react/lib/Icon";
import { SearchBox } from "@fluentui/react/lib/SearchBox";

import {
    CommandBar,
    ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import { IButtonProps, IButtonStyles } from "@fluentui/react/lib/Button";

import { IconButton } from "@fluentui/react/lib/Button";
import {
    IIconProps,
    IContextualMenuProps,
    Stack,
    Link,
    Label,
    Pivot,
    PivotItem,
} from "@fluentui/react";

import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Facepile, IFacepilePersona } from "@fluentui/react/lib/Facepile";
import {
    PersonaSize,
    PersonaPresence,
    IPersonaSharedProps,
    Persona,
} from "@fluentui/react/lib/Persona";

import {
    Nav as SideBar,
    INavStyles,
    INavLinkGroup,
} from "@fluentui/react/lib/Nav";
import { AuthContext } from "../../auth/context/auth-context";
import { useNavigate } from "react-router-dom";

initializeIcons();

const emojiIcon: IIconProps = { iconName: "WaffleOffice365" };
/* const helpIcon: IIconProps = { iconName: "Help" }; */
const lockIcon: IIconProps = { iconName: "Lock" };
const notificationIcon: IIconProps = { iconName: "Ringer" };
const todoIcon: IIconProps = { iconName: "CalendarWorkWeek" };
const butonLeftStyles: IButtonStyles = {
    icon: {
        fontSize: "24px",
    },
};

const facePilePersona: IFacepilePersona[] = [
    {
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMOlbxGJfLYDHjven237kqanw0DLtbVSHSfA&usqp=CAU",
    },
];

const examplePersona: IPersonaSharedProps = {
    imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMOlbxGJfLYDHjven237kqanw0DLtbVSHSfA&usqp=CAU",
    imageInitials: "AL",
    text: "Annie Lindqvist",
    secondaryText: "Software Engineer",
    tertiaryText: "In a meeting",
    optionalText: "Available at 4:00pm",
};

const navStyles: Partial<INavStyles> = { root: { width: 300 } };

const navLinkGroups: INavLinkGroup[] = [
    {
        name: "Basic components",
        expandAriaLabel: "Expand Basic components section",
        collapseAriaLabel: "Collapse Basic components section",
        links: [
            {
                key: "ActivityItem",
                name: "ActivityItem",
                url: "#/examples/activityitem",
            },
            {
                key: "Breadcrumb",
                name: "Breadcrumb",
                url: "#/examples/breadcrumb",
            },
            {
                key: "Button",
                name: "Button",
                url: "#/examples/button",
            },
        ],
    },
    {
        name: "Extended components",
        expandAriaLabel: "Expand Extended components section",
        collapseAriaLabel: "Collapse Extended components section",
        links: [
            {
                key: "ColorPicker",
                name: "ColorPicker",
                url: "#/examples/colorpicker",
            },
            {
                key: "ExtendedPeoplePicker",
                name: "ExtendedPeoplePicker",
                url: "#/examples/extendedpeoplepicker",
            },
            {
                key: "GroupedList",
                name: "GroupedList",
                url: "#/examples/groupedlist",
            },
        ],
    },
    {
        name: "Utilities",
        expandAriaLabel: "Expand Utilities section",
        collapseAriaLabel: "Collapse Utilities section",
        links: [
            {
                key: "FocusTrapZone",
                name: "FocusTrapZone",
                url: "#/examples/focustrapzone",
            },
            {
                key: "FocusZone",
                name: "FocusZone",
                url: "#/examples/focuszone",
            },
            {
                key: "MarqueeSelection",
                name: "MarqueeSelection",
                url: "#/examples/marqueeselection",
            },
        ],
    },
];

const NavbarTest = () => {
    const { signout } = useContext(AuthContext);
    const navigate = useNavigate();

    const _handleSignout = () => {
        signout(() => navigate('/login', { replace: true }))
    }

    return (
        <div>
            <div className={navHeader}>
                <div className={navHeaderLeft}>
                    <PrimaryButton iconProps={emojiIcon} className={btnClass} />
                </div>
                <div className={navHeaderCenter}>Ocio</div>
                <div className={navHeaderRight}>
                    <PrimaryButton iconProps={todoIcon} className={btnClass} />
                    <PrimaryButton iconProps={notificationIcon} className={btnClass} />
                    <PrimaryButton iconProps={lockIcon} ariaLabel='Signout' title='Signout' className={btnClass} onClick={_handleSignout} />
                    <PrimaryButton
                        className={btnClass}
                        styles={butonLeftStyles}
                        children={
                            <Persona
                                {...examplePersona}
                                text="Annie Lindqvist (Available)"
                                size={PersonaSize.size32}
                                presence={PersonaPresence.online}
                                hidePersonaDetails={false}
                                imageAlt="Annie Lindqvist, status is online"
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

const theme = getTheme();

const navHeader = mergeStyles([
    {
        height: "48px",
        lineHeight: "48px",
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        width: "100%",
        display: "flex",
    },
    AnimationClassNames.scaleUpIn100,
]);

const navHeaderLeft = mergeStyles([
    {
        padding: "0px",
        margin: "0px",
    },
    AnimationClassNames.scaleUpIn100,
]);

const navHeaderCenter = mergeStyles([
    {
        padding: "0px",
        margin: "0px",
        flex: "1 0 auto",
    },
]);

const navHeaderRight = mergeStyles([
    {
        padding: "0px",
        margin: "0px",
        flex: "0 0 auto",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
    },
]);

const btnClass = mergeStyles([
    {
        height: "48px",
        width: "48px",
        minWidth: "48px",
    },
]);

const styles = mergeStyleSets({
    container: {
        maxWidth: 300,
    },
    control: {
        paddingTop: 20,
    },
    slider: {
        margin: "10px 0",
    },
    checkbox: {
        paddingTop: 15,
    },
    dropdown: {
        paddingTop: 0,
        margin: "10px 0",
    },
});

export default NavbarTest;
