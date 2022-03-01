import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { DefaultButton, Panel, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { IDocument } from '../interfaces/IBase';

/* Style */
const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    },
});

const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px',
    },
};

const buttonStyles = { root: { marginRight: 8 } };

const FILE_ICONS: { name: string }[] = [
    { name: 'accdb' },
    { name: 'audio' },
    { name: 'code' },
    { name: 'csv' },
    { name: 'docx' },
    { name: 'dotx' },
    { name: 'mpp' },
    { name: 'mpt' },
    { name: 'model' },
    { name: 'one' },
    { name: 'onetoc' },
    { name: 'potx' },
    { name: 'ppsx' },
    { name: 'pdf' },
    { name: 'photo' },
    { name: 'pptx' },
    { name: 'presentation' },
    { name: 'potx' },
    { name: 'pub' },
    { name: 'rtf' },
    { name: 'spreadsheet' },
    { name: 'txt' },
    { name: 'vector' },
    { name: 'vsdx' },
    { name: 'vssx' },
    { name: 'vstx' },
    { name: 'xlsx' },
    { name: 'xltx' },
    { name: 'xsn' },
];

export const CustomPanel = () => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [columns, setColumns] = useState<IColumn[]>([]);

    const [item, setItem] = useState<IDocument[]>([]);
    const [sel, setSel] = useState<any[]>([]);
    const [isCompactMode, setIsCompactMode] = useState(false);
    const [isModalSelection, setIsModalSelection] = useState(false);
    const [selectionDetails, setSelectionDetails] = useState('');
    const [announcedMessage, setAnnouncedMessage] = useState('');

    const selection = new Selection({
        onSelectionChanged: () => {
            console.log('Selected count:' + selection.count);
            console.log(selection.getSelection());
            setSelectionDetails(_getSelectionDetails);
            setSel(selection.getSelection());
        }
    });

    /* Effect */
    useEffect(() => {
        generateColum();
        generateItem();
    }, []);

    /* Function */
    const generateColum = () => {
        let col: IColumn[] = [
            {
                key: 'column1',
                name: 'File Type',
                className: classNames.fileIconCell,
                iconClassName: classNames.fileIconHeaderIcon,
                ariaLabel: 'Column operations for File type, Press to sort on File type',
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'name',
                minWidth: 16,
                maxWidth: 16,
                onColumnClick: _onColumnClick,
                onRender: (item: IDocument) => (
                    <TooltipHost content={`${item.fileType} file`}>
                        <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
                    </TooltipHost>
                ),
            },
            {
                key: 'column2',
                name: 'Name',
                fieldName: 'name',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: 'Sorted A to Z',
                sortDescendingAriaLabel: 'Sorted Z to A',
                onColumnClick: _onColumnClick,
                data: 'string',
                isPadded: true,
            },
            {
                key: 'column3',
                name: 'Date Modified',
                fieldName: 'dateModifiedValue',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: _onColumnClick,
                data: 'number',
                onRender: (item: IDocument) => {
                    return <span>{item.dateModified}</span>;
                },
                isPadded: true,
            },
            {
                key: 'column4',
                name: 'Modified By',
                fieldName: 'modifiedBy',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                onColumnClick: _onColumnClick,
                onRender: (item: IDocument) => {
                    return <span>{item.modifiedBy}</span>;
                },
                isPadded: true,
            },
            {
                key: 'column5',
                name: 'File Size',
                fieldName: 'fileSizeRaw',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'number',
                onColumnClick: _onColumnClick,
                onRender: (item: IDocument) => {
                    return <span>{item.fileSize}</span>;
                },
            },
        ];

        setColumns(col);
    }

    const generateItem = () => {
        const d: IDocument[] = [];
        for (let i = 0; i < 500; i++) {
            const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
            const randomFileSize = _randomFileSize();
            const randomFileType = _randomFileIcon();
            let fileName = _lorem(2);
            fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
            let userName = _lorem(2);
            userName = userName
                .split(' ')
                .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(' ');
            d.push({
                key: i.toString(),
                name: fileName,
                value: fileName,
                iconName: randomFileType.url,
                fileType: randomFileType.docType,
                modifiedBy: userName,
                dateModified: randomDate.dateFormatted,
                dateModifiedValue: randomDate.value,
                fileSize: randomFileSize.value,
                fileSizeRaw: randomFileSize.rawSize,
            });
        }

        setItem(d);
    }

    const _randomDate = (start: Date, end: Date): { value: number; dateFormatted: string } => {
        const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return {
            value: date.valueOf(),
            dateFormatted: date.toLocaleDateString(),
        };
    }

    const _randomFileSize = (): { value: string; rawSize: number } => {
        const fileSize: number = Math.floor(Math.random() * 100) + 30;
        return {
            value: `${fileSize} KB`,
            rawSize: fileSize,
        };
    }

    const _randomFileIcon = (): { docType: string; url: string } => {
        const docType: string = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
        return {
            docType,
            url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
        };
    }

    const _lorem = (wordCount: number): string => {
        let LOREM_IPSUM = (
            'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
            'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
        ).split(' ');
        let loremIndex = 0;

        const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
        loremIndex = startIndex + wordCount;
        return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
    }

    /* Table */
    const _onChangeCompactMode = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
        if (checked != undefined) {
            setIsCompactMode(checked);
        }
    };

    const _onChangeModalSelection = (event: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
        if (checked != undefined) {
            setIsModalSelection(checked);
        }
    };

    const _onChangeText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let t: IDocument[] = item;

        if (newValue != undefined) {
            t = item.filter(x => x.name.toLocaleLowerCase().indexOf(newValue) > -1);
        }

        setItem(t);
    };

    const _getSelectionDetails = (): string => {
        if (selection != undefined) {
            console.log(selection);
            const selectionCount = selection.getSelectedCount();

            switch (selectionCount) {
                case 0:
                    return 'No items selected';
                case 1:
                    return '1 item selected: ' + (selection.getSelection()[0] as IDocument).name;
                default:
                    return `${selectionCount} items selected`;
            }
        } else {
            return '';
        }
    }

    const _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;

                setAnnouncedMessage(
                    `${currColumn.name} is sorted ${currColumn.isSortedDescending ? 'descending' : 'ascending'}`
                );
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });

        const newItems = _copyAndSort(item, currColumn.fieldName!, currColumn.isSortedDescending);
        setColumns(newColumns);
        setItem(newItems);
    };

    const _getKey = (item: any, index?: number): string => {
        return item.key;
    }

    const _onItemInvoked = (item: any): void => {
        alert(`Item invoked: ${item.name}`);
    }

    function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
        const key = columnKey as keyof T;
        return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    }


    /* Footer Panel */
    const onRenderFooterContent = React.useCallback(
        () => (
            <div>
                <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
                    Save
                </PrimaryButton>
                <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
            </div>
        ),
        [dismissPanel],
    );

    return (
        <>
            <DefaultButton text="Open panel" onClick={openPanel} />

            {/* Table */}
            <div>
                <div className={classNames.controlWrapper}>
                    <Toggle
                        label="Enable compact mode"
                        checked={isCompactMode}
                        onChange={_onChangeCompactMode}
                        onText="Compact"
                        offText="Normal"
                        styles={controlStyles}
                    />
                    <Toggle
                        label="Enable modal selection"
                        checked={isModalSelection}
                        onChange={_onChangeModalSelection}
                        onText="Modal"
                        offText="Normal"
                        styles={controlStyles}
                    />
                    <TextField label="Filter by name:" onChange={_onChangeText} styles={controlStyles} />
                    <Announced message={`Number of items after filter applied: ${item.length}.`} />
                </div>
                <div className={classNames.selectionDetails}>{selectionDetails}</div>
                <Announced message={selectionDetails} />
                {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
                {isModalSelection ? (
                    <MarqueeSelection selection={selection}>
                        <DetailsList
                            items={item}
                            compact={isCompactMode}
                            columns={columns}
                            selectionMode={SelectionMode.multiple}
                            getKey={_getKey}
                            setKey="multiple"
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                            selection={selection}
                            selectionPreservedOnEmptyClick={true}
                            onItemInvoked={_onItemInvoked}
                            enterModalSelectionOnTouch={true}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="select row"
                        />
                    </MarqueeSelection>
                ) : (
                    <DetailsList
                        items={item}
                        compact={isCompactMode}
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        getKey={_getKey}
                        setKey="none"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        onItemInvoked={_onItemInvoked}
                    />
                )}
            </div>

            <Panel
                isOpen={isOpen}
                onDismiss={dismissPanel}
                headerText="Panel with footer at bottom"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={onRenderFooterContent}
                // Stretch panel content to fill the available height so the footer is positioned
                // at the bottom of the page
                isFooterAtBottom={true}
            >
                <p>Content goes here.</p>

                <DetailsList
                    items={sel}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    getKey={_getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={_onItemInvoked}
                />

                <pre>{ JSON.stringify(sel, null, 2) }</pre>
            </Panel>
        </>
    )
}