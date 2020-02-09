import React from 'react';
import { SketchPicker } from 'react-color';
import { Input, InputProps } from 'antd';
import omit from 'omit.js';
import styles from './index.less';

export interface ColorState {
    visible: boolean;
    fontColor: string;
    value?: string;
}

class ColorPicer extends React.Component<InputProps, ColorState>
{
    state = { fontColor: '#000', visible: false, value: this.props.value || this.props.defaultValue };

    // eslint-disable-next-line class-methods-use-this
    getColor(rgb: any) {
        const isLight = 0.213 * rgb.r + 0.715 * rgb.g + 0.072 * rgb.b > 255 / 2
        return isLight ? '#333' : '#d9d9d9';
    };

    handleChangeComplete = (color: { hex: any, rgb: any }) => {
        const value = color.hex.toUpperCase();
        this.setState({ visible: false, fontColor: this.getColor(color.rgb), value });
        this.props.onChange(value);
    };

    handleClick = () => {
        this.setState({ visible: true });
    }

    render() {
        const restProps = omit(this.props, ['value']);
        const { fontColor, visible, value } = this.state;
        return (<>
            <Input
                {...restProps}
                value={value}
                style={{ color: fontColor, backgroundColor: value }}
                onClick={this.handleClick}
            />
            {
                visible ? <SketchPicker
                    onChangeComplete={this.handleChangeComplete}
                    color={value}
                    className={styles.popover}
                >
                </SketchPicker>
                    : null
            }
        </>);
    };
}

export default ColorPicer;