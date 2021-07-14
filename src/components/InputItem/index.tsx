import React, { FC } from 'react';
import classnames from 'classnames';
import { ClickEvent, StringEvent } from '@/PropsType';
import { IInputItemProps } from './interface';
import { allPrefixCls } from '../../const/index';
import './index.less';

const prefixCls = 'alitajs-dform-input-item';

const InputItem: FC<IInputItemProps> = (props) => {
  const {
    isVertical = false,
    value = '',
    placeholder = '',
    onClick,
    editable = true,
    onChange,
    labelNumber = 5,
    coverStyle = {},
    disabled = false,
    extra = '',
    className = '',
    onBlur,
    onFocus,
  } = props;

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
  });

  const inputItemClick = (e: ClickEvent) => {
    if (onClick) onClick(e);
  };
  const inputItemChange = (e: StringEvent) => {
    if (onChange) onChange(e);
  };

  return (
    <div className={prefixCls}>
      {!isVertical && <div className={labelCls}>{props.children}</div>}
      <div
        className={`${prefixCls}-value`}
        onClick={(e: ClickEvent) => {
          if (disabled) return;
          inputItemClick(e);
        }}
      >
        <input
          type="text"
          value={value}
          readOnly={!editable || disabled}
          style={{
            textAlign: isVertical ? 'left' : 'right',
            ...coverStyle,
          }}
          onFocus={(e: any) => {
            if (disabled) return;
            if (onFocus) onFocus(e.target.value);
          }}
          onBlur={(e: any) => {
            if (disabled) return;
            if (onBlur) onBlur(e.target.value);
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputItemChange(e.target.value);
          }}
          className={classnames({
            [`${prefixCls}-text`]: true,
            'alitajs-dform-disabled': !editable || disabled,
            [className]: className,
          })}
          placeholder={placeholder}
        />
        {extra}
      </div>
    </div>
  );
};

export default InputItem;
