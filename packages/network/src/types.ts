import { AriaAttributes, MouseEvent, FunctionComponent } from 'react'
import { AnimatedProps } from '@react-spring/web'
import { Box, Theme, Dimensions, ModernMotionProps, PropertyAccessor } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'

export interface NetworkInputNode {
    id: string
}

export interface NetworkComputedNode<N extends NetworkInputNode> {
    id: string
    x: number
    y: number
    radius: number
    color: string
    data: N
    [key: string]: unknown
}

export interface NetworkNodeAnimatedProps {
    x: number
    y: number
    radius: number
    color: string
    borderWidth: number
    borderColor: string
    opacity: number
    scale: number
}

export interface NetworkNodeProps<N extends NetworkInputNode> {
    node: NetworkComputedNode<N>
    animated: AnimatedProps<NetworkNodeAnimatedProps>
    scale?: number
    onClick?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseEnter?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseMove?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseLeave?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
}
export type NetworkNodeComponent<N extends NetworkInputNode> = FunctionComponent<
    NetworkNodeProps<N>
>

export interface InputLink {
    source: string
    target: string
    [key: string]: unknown
}

export interface ComputedLink<N extends NetworkInputNode> {
    id: string
    source: NetworkComputedNode<N>
    target: NetworkComputedNode<N>
    [key: string]: unknown
}

export interface LinkAnimatedProps {
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    opacity: number
}

export interface NetworkDataProps<N extends NetworkInputNode> {
    data: {
        nodes: N[]
        links: InputLink[]
    }
}

export type NetworkLayerId = 'links' | 'nodes'
export interface NetworkCustomLayerProps<N extends NetworkInputNode> {
    nodes: NetworkComputedNode<N>[]
    links: ComputedLink<N>[]
}
export type NetworkCustomLayer<N extends NetworkInputNode> = FunctionComponent<
    NetworkCustomLayerProps<N>
>

export interface NetworkNodeTooltipProps<N extends NetworkInputNode> {
    node: NetworkComputedNode<N>
}
export type NetworkNodeTooltipComponent<N extends NetworkInputNode> = FunctionComponent<
    NetworkNodeTooltipProps<N>
>

// support static color or a dynamic function receiving the node
export type NetworkNodeColor<N extends NetworkInputNode> =
    | string
    | ((node: NetworkComputedNode<N>) => string)

export interface NetworkCommonProps<N extends NetworkInputNode> {
    margin: Box

    layers: (NetworkLayerId | NetworkCustomLayer<N>)[]

    linkDistance: number | PropertyAccessor<InputLink, number>
    repulsivity: number
    distanceMin: number
    distanceMax: number
    iterations: number

    theme: Theme

    nodeColor: NetworkNodeColor<N>
    nodeBorderWidth: number
    nodeBorderColor: InheritedColorConfig<NetworkComputedNode<N>>

    linkThickness: number | PropertyAccessor<ComputedLink<N>, number>
    linkColor: InheritedColorConfig<ComputedLink<N>>

    isInteractive: boolean
    nodeTooltip: NetworkNodeTooltipComponent<N>
    onClick: (node: NetworkComputedNode<N>, event: MouseEvent) => void

    renderWrapper: boolean

    role: string
    ariaLabel: AriaAttributes['aria-label']
    ariaLabelledBy: AriaAttributes['aria-labelledby']
    ariaDescribedBy: AriaAttributes['aria-describedby']
}

export type NetworkSvgProps<N extends NetworkInputNode> = Partial<NetworkCommonProps<N>> &
    NetworkDataProps<N> &
    Dimensions &
    ModernMotionProps & {
        nodeComponent?: NetworkNodeComponent<N>
    }

export type NetworkCanvasProps<N extends NetworkInputNode> = Partial<NetworkCommonProps<N>> &
    NetworkDataProps<N> &
    Dimensions &
    // only used by tooltips
    ModernMotionProps & {
        pixelRatio?: number
    }