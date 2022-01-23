import { createTheme, ITheme, mergeStyles, mergeStyleSets } from "@fluentui/react";

const themeTitle: ITheme = createTheme({
    fonts: {
      medium: {
        /* fontFamily: 'Monaco, Menlo, Consolas', */
        fontSize: '20px',
      },
    },
});

const classes = mergeStyleSets({
    icon: {
        fontSize: 70,
        height: 70,
        width: 70,
        margin: '0 25px',
    },    
});

const stackTokens = { childrenGap: 10 };

const ThemeBase = {
    themeTitle,
    classes,
    stackTokens,
}

export default ThemeBase;