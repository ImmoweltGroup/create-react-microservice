// @flow

import type {StateType} from './../../types.js';

import {$get} from 'plow-js';
import {moduleId} from './config.js';

export const getCounter = (state: StateType): number => $get([moduleId, 'value'], state);
