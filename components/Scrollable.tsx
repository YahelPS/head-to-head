import { VStack } from "@chakra-ui/react";
import * as React from "react";
import { ReactNode } from "react";

export type ScrollableFeedProps = {
  forceScroll?: boolean;
  animateScroll?: (element: HTMLElement, offset: number) => void;
  onScrollComplete?: () => void;
  changeDetectionFilter?: (
    previousProps: ScrollableFeedComponentProps,
    newProps: ScrollableFeedComponentProps
  ) => boolean;
  viewableDetectionEpsilon?: number;
  className?: string;
  onScroll?: (isAtBottom: boolean) => void;
};

type ScrollableFeedComponentProps = Readonly<{ children?: ReactNode }> &
  Readonly<ScrollableFeedProps>;

class ScrollableFeed extends React.Component<ScrollableFeedProps> {
  private readonly wrapperRef: React.RefObject<HTMLDivElement>;
  private readonly bottomRef: React.RefObject<HTMLDivElement>;

  constructor(props: ScrollableFeedProps) {
    super(props);
    this.bottomRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  static defaultProps: ScrollableFeedProps = {
    forceScroll: false,
    animateScroll: (element: HTMLElement, offset: number): void => {
      if (element.scrollBy) {
        element.scrollBy({ top: offset });
      } else {
        element.scrollTop = offset;
      }
    },
    onScrollComplete: () => {},
    changeDetectionFilter: () => true,
    viewableDetectionEpsilon: 2,
    onScroll: () => {},
  };

  getSnapshotBeforeUpdate(): boolean {
    if (this.wrapperRef.current && this.bottomRef.current) {
      const { viewableDetectionEpsilon } = this.props;
      return ScrollableFeed.isViewable(
        this.wrapperRef.current,
        this.bottomRef.current,
        viewableDetectionEpsilon!
      );
    }
    return false;
  }

  componentDidUpdate(
    previousProps: ScrollableFeedComponentProps,
    snapshot: boolean
  ): void {
    const { forceScroll, changeDetectionFilter } = this.props;
    const isValidChange = changeDetectionFilter!(previousProps, this.props);
    if (
      isValidChange &&
      (forceScroll || snapshot) &&
      this.bottomRef.current &&
      this.wrapperRef.current
    ) {
      this.scrollParentToChild(this.wrapperRef.current, this.bottomRef.current);
    }
  }

  componentDidMount(): void {
    if (this.bottomRef.current && this.wrapperRef.current) {
      this.scrollParentToChild(this.wrapperRef.current, this.bottomRef.current);
    }
  }

  /**
   * Scrolls a parent element such that the child element will be in view
   * @param parent
   * @param child
   */
  protected scrollParentToChild(parent: HTMLElement, child: HTMLElement): void {
    const { viewableDetectionEpsilon } = this.props;
    if (!ScrollableFeed.isViewable(parent, child, viewableDetectionEpsilon!)) {
      const parentRect = parent.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();

      const scrollOffset = childRect.top + parent.scrollTop - parentRect.top;
      const { animateScroll, onScrollComplete } = this.props;
      if (animateScroll) {
        animateScroll(parent, scrollOffset);
        onScrollComplete!();
      }
    }
  }

  /**
   * Returns whether a child element is visible within a parent element
   *
   * @param parent
   * @param child
   * @param epsilon
   */
  private static isViewable(
    parent: HTMLElement,
    child: HTMLElement,
    epsilon: number
  ): boolean {
    epsilon = epsilon || 0;

    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const childTopIsViewable = childRect.top >= parentRect.top;

    const childOffsetToParentBottom =
      parentRect.top + parent.clientHeight - childRect.top;
    const childBottomIsViewable = childOffsetToParentBottom + epsilon >= 0;

    return childTopIsViewable && childBottomIsViewable;
  }

  /**
   * Fires the onScroll event, sending isAtBottom boolean as its first parameter
   */
  protected handleScroll(): void {
    const { viewableDetectionEpsilon, onScroll } = this.props;
    if (onScroll && this.bottomRef.current && this.wrapperRef.current) {
      const isAtBottom = ScrollableFeed.isViewable(
        this.wrapperRef.current,
        this.bottomRef.current,
        viewableDetectionEpsilon!
      );
      onScroll(isAtBottom);
    }
  }

  /**
   * Scroll to the bottom
   */
  public scrollToBottom(): void {
    if (this.bottomRef.current && this.wrapperRef.current) {
      this.scrollParentToChild(this.wrapperRef.current, this.bottomRef.current);
    }
  }

  render(): React.ReactNode {
    const { children, className } = this.props;

    return (
      <div ref={this.wrapperRef} onScroll={this.handleScroll}>
        {children}
        <div ref={this.bottomRef}></div>
      </div>

      // <VStack
      //   alignItems="flex-end"
      //   // flexDir="column-reverse"
      //   maxH="2xl"
      //   overflowY="scroll"
      //   pr={2}
      //   onScroll={this.handleScroll}
      //   ref={this.wrapperRef}
      //   css={{
      //     // WebkitMask:
      //     //   "linear-gradient(180deg, rgba(0,0,0,0) 50px, rgba(0,0,0,1) 100px)",

      //     "&::-webkit-scrollbar": {
      //       width: 4,
      //     },
      //     "&::-webkit-scrollbar-track": {
      //       width: 6,
      //     },
      //     "&::-webkit-scrollbar-thumb": {
      //       background: "#99aab5",
      //       borderRadius: 24,
      //     },
      //   }}
      // >
      //   {children}
      //   <div ref={this.bottomRef}></div>
      // </VStack>
    );
  }
}

export default ScrollableFeed;
