import React, { Fragment } from 'react';
import { SketchPicker, TwitterPicker, PhotoshopPicker, ChromePicker } from 'react-color';
import { Input } from 'antd';
import omit from 'omit.js';
import { InputProps } from 'antd/lib/input';
import styles from './index.less';

export interface ColorState {
    visible: boolean;
    fontColor: string;
    value?: string | number | string[];
}

export enum ColorType {
    Default,
    TW,
    PS,
    Chrome,
}

export interface ColorProps extends Omit<InputProps, 'type'> {
    type?: ColorType,
}

class ColorPicer extends React.Component<ColorProps, ColorState>
{
    state = { fontColor: '#000', visible: false, value: this.props.value || this.props.defaultValue };

    // eslint-disable-next-line class-methods-use-this
    getColor(rgb: any) {
        const isLight = 0.213 * rgb.r + 0.715 * rgb.g + 0.072 * rgb.b > 255 / 2
        return isLight ? '#333' : '#d9d9d9';
    };

    handleChangeComplete = (color: { hex: any, rgb: any }) => {
        const { onChange } = this.props;
        const value = color.hex.toUpperCase();
        this.setState({ fontColor: this.getColor(color.rgb), value });
        if (onChange)
            onChange(value);
    };

    handleClick = () => {
        this.setState({ visible: true });
    }

    hide = () => this.setState({ visible: false });

    renderPicker = value => {
        const { type } = this.props;
        switch (type) {
            case ColorType.TW:
                return (<TwitterPicker
                    onChangeComplete={this.handleChangeComplete}
                    color={value}
                    className={styles.popover}
                    disableAlpha
                >
                </TwitterPicker>);
            case ColorType.PS:
                return (<PhotoshopPicker
                    onChangeComplete={this.handleChangeComplete}
                    color={value}
                    className={styles.popover}
                    onAccept={this.hide}
                    onCancel={() => this.setState({ visible: false, value: undefined })}
                    disableAlpha
                >
                </PhotoshopPicker>);
            case ColorType.Chrome:
                return (<ChromePicker
                    onChangeComplete={this.handleChangeComplete}
                    color={value}
                    className={styles.popover}
                    disableAlpha
                >
                </ChromePicker>);
            default:
                return (<SketchPicker
                    onChangeComplete={this.handleChangeComplete}
                    color={value}
                    className={styles.popover}
                    disableAlpha
                >
                </SketchPicker>);
        }
    }

    render() {
        const restProps = omit(this.props, ['value', 'type', 'onChange']);
        const { fontColor, visible, value } = this.state;
        return (<>
            <Input
                {...restProps}
                value={value}
                style={{ color: fontColor, backgroundColor: value }}
                onClick={this.handleClick}
            />
            {
                visible ?
                    <Fragment>
                        <div
                            className={styles.cover}
                            onClick={() => this.setState({ visible: false })}
                        ></div>

                        {this.renderPicker(value)}
                    </Fragment>
                    : null
            }
        </>);
    };
}

export default ColorPicer;