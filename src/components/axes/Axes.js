/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import shouldUpdate from 'recompose/shouldUpdate'
import { motionPropTypes } from '../../props'
import Axis, { axisPropType } from './Axis'

const horizontalPositions = ['top', 'bottom']
const verticalPositions = ['left', 'right']
const positions = [...horizontalPositions, ...verticalPositions]

const Axes = ({
    xScale,
    yScale,
    width,
    height,
    top,
    right,
    bottom,
    left,
    theme,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const axes = { top, right, bottom, left }

    return (
        <g>
            {positions.map(position => {
                if (!axes[position]) return null

                const axis = axes[position]
                if (axis.enabled !== undefined && axis.enabled === false) return null

                const scale = horizontalPositions.includes(position) ? xScale : yScale

                return (
                    <Axis
                        theme={theme}
                        {...axis}
                        key={position}
                        width={width}
                        height={height}
                        position={position}
                        scale={scale}
                        animate={animate}
                        motionDamping={motionDamping}
                        motionStiffness={motionStiffness}
                    />
                )
            })}
        </g>
    )
}

Axes.propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    top: axisPropType,
    right: axisPropType,
    bottom: axisPropType,
    left: axisPropType,

    theme: PropTypes.object.isRequired,

    // motion
    ...motionPropTypes,
}

export default shouldUpdate(
    (props, nextProps) =>
        props.xScale !== nextProps.xScale ||
        props.yScale !== nextProps.yScale ||
        props.width !== nextProps.width ||
        props.height !== nextProps.height ||
        props.theme !== nextProps.theme ||
        props.animate !== nextProps.animate ||
        props.motionDamping !== nextProps.motionDamping ||
        props.motionStiffness !== nextProps.motionStiffness ||
        !isEqual(props.top, nextProps.top) ||
        !isEqual(props.right, nextProps.right) ||
        !isEqual(props.bottom, nextProps.bottom) ||
        !isEqual(props.left, nextProps.left)
)(Axes)
