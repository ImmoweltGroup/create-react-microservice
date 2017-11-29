// @flow

import type {Connector} from 'react-redux';
import type {StateType} from './../../store/types.js';

type OwnPropsType = {};
type StatePropsType = {};
type DispatchPropsType = {};
type PropsType = OwnPropsType & StatePropsType & DispatchPropsType;

import React from 'react';
import {connect} from 'react-redux';

const {{=it.name.upperCamelCase}} = (props: PropsType) => {
  return (
    <div>My container</div>
  )
};

const mapStateToProps = (
  state: StateType,
  ownProps: OwnPropsType
): StatePropsType => ({});
const mapDispatchToProps: DispatchPropsType = {};
const connector: Connector<OwnPropsType, PropsType> = connect(
  mapStateToProps,
  mapDispatchToProps
);

const Container = connector({{=it.name.upperCamelCase}});

export {{{=it.name.upperCamelCase}}, mapStateToProps, mapDispatchToProps, Container as default};
