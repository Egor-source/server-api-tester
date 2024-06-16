import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

interface ISetItem {
  stateItem: { [key: string]: any } | any[];
  isCollapsed?: boolean;
}

const StateItem: FC<ISetItem> = ({ stateItem, isCollapsed }) => {
  const [collapsed, setCollapsed] = useState(isCollapsed ?? true);
  const toggleCollapsed = (value: boolean) => {
    setCollapsed(value);
  };

  if (collapsed) {
    return (
      <Button
        onClick={() => toggleCollapsed(false)}
        className="btn-light text-nowrap border-0"
        style={{ background: '#fff' }}
        size="sm"
      >
        <i className="bi bi-caret-up-fill mr-"></i>{' '}
        {Array.isArray(stateItem) ? '[Array]' : '[Object]'}
      </Button>
    );
  }

  const getValueColorByType = (value: any) => {
    if (typeof value === 'string') return '#A31515';
    if (typeof value === 'boolean') return '#008000';
    if (typeof value === 'number') return '#0000FF';
    if (typeof value === 'undefined') return '#808080';
    if (typeof value === 'bigint') return '#00008B';
    if (value === null) return '#800080';
    return '#000';
  };

  const getValueString = (value: any) => {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    return value.toString();
  };

  const getStateItemProps = () => {
    if (Array.isArray(stateItem)) {
      return stateItem.map((item) => {
        return typeof item === 'object' ? (
          <StateItem key={item} stateItem={item} />
        ) : (
          <div key={item}>{getValueString(item)}</div>
        );
      });
    } else {
      return Object.entries(stateItem).map(([key, value]) => {
        return typeof value === 'object' && value !== null ? (
          <div key={key} className="text-nowrap">
            <span style={{ color: '#001080' }}>{key}</span>:{' '}
            <StateItem stateItem={value} />
          </div>
        ) : (
          <div key={key} className="text-nowrap">
            <span style={{ color: '#001080' }}>{key}</span>:{' '}
            <span
              className="text-wrap text-break"
              style={{ color: getValueColorByType(value) }}
            >
              {getValueString(value)}
            </span>
          </div>
        );
      });
    }
  };

  return (
    <span>
      <Button
        onClick={() => toggleCollapsed(true)}
        className="btn-light border-0"
        style={{ background: '#fff' }}
        size="sm"
      >
        <i className="bi bi-caret-down-fill"></i>
      </Button>{' '}
      {Array.isArray(stateItem) ? '[' : '{'}
      <div
        style={{
          paddingLeft: 40,
        }}
      >
        {getStateItemProps()}
      </div>
      <span>{Array.isArray(stateItem) ? ']' : '}'}</span>
    </span>
  );
};

export default StateItem;
