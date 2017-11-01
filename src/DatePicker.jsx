/* eslint no-console:0 */
import React from 'react';
import '../style';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import { formatFn, getProps, getDefaultDate } from './utils';
import assign from 'object-assign';
import { getComponentLocale, getLocaleCode } from '@gag/util/getLocale';

function getDefaultProps() {
  return assign({
    prefixCls: 'am-picker',
    pickerPrefixCls: 'am-picker-col',
    popupPrefixCls: 'am-picker-popup',
    minuteStep: 1,
  }, getProps());
}

class DatePicker extends React.Component{
  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  render() {
    const { props, context } = this;
    const { children, value, defaultDate, extra, popupPrefixCls } = props;

    const locale = getComponentLocale(props, context, 'DatePicker', () => require('../locale/zh_CN'));
    const localeCode = getLocaleCode(context);
    const { okText, dismissText, DatePickerLocale } = locale;

    if (localeCode) {
      if (value) {
        value.locale(localeCode);
      }
      if (defaultDate) {
        defaultDate.locale(localeCode);
      }
    }

    const dataPicker = (
      <RCDatePicker
        minuteStep={props.minuteStep}
        locale={DatePickerLocale}
        minDate={props.minDate}
        maxDate={props.maxDate}
        mode={props.mode}
        pickerPrefixCls={props.pickerPrefixCls}
        prefixCls={props.prefixCls}
        defaultDate={value || getDefaultDate(this.props)}
      />
    );
    return (
      <PopupDatePicker
        datePicker={dataPicker}
        WrapComponent="div"
        transitionName="am-slide-up"
        maskTransitionName="am-fade"
        {...props}
        prefixCls={popupPrefixCls}
        date={value || getDefaultDate(this.props)}
        dismissText={dismissText}
        okText={okText}
      >
        {children && React.cloneElement(children, { extra: value ? formatFn(this, value) : extra })}
      </PopupDatePicker>
    );
  }
}


DatePicker.defaultProps = getDefaultProps();
DatePicker.propTypes = {
  defaultDate: React.PropTypes.any,
  value: React.PropTypes.any,
  onChange:React.PropTypes.func,
  format:React.PropTypes.func,
  cols: React.PropTypes.number,
  mode: React.PropTypes.string,
  extra: React.PropTypes.string,
  children: React.PropTypes.any,
  minDate: React.PropTypes.any,
  maxDate: React.PropTypes.any,
  locale: React.PropTypes.any,
  disabled:React.PropTypes.bool,
  minuteStep: React.PropTypes.number,
  /** web only */
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  pickerPrefixCls: React.PropTypes.string,
  popupPrefixCls: React.PropTypes.string,
  dismissText:React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
  ]),
  okText:React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
  ]) // React.ReactElement only for web
};
DatePicker.displayName = "DatePicker";
module.exports=DatePicker;
