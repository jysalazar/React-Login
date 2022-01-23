import { FontIcon, Separator, Stack } from "@fluentui/react";
import ThemeBase from "../../util/theme/theme-base";

const stackTokens = { childrenGap: 10 };

function TitleSeparator({title = '', icon = '', isPadding = false}) {
    return (
        <div className="ms-Grid" dir="ltr" style={isPadding ? {
            paddingBottom: '15px'
        } : {}}>
            <div className="ms-Grid-row">
                {icon != '' && <>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <FontIcon aria-label={icon} iconName={icon} className={ThemeBase.classes.icon} />
                    </div>
                </>}

                {title != '' && <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <Stack tokens={stackTokens}>
                        <Separator theme={ThemeBase.themeTitle}>{title}</Separator>
                    </Stack>
                </div>}
            </div>
        </div>
    )
}

export default TitleSeparator;