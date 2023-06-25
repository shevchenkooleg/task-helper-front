import cls from "./Page.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import React, { type MutableRefObject, type ReactNode, useRef } from "react";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
// import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
// import { type StateSchema } from "@/app/providers/StoreProvider";
import { type TestProps } from "@/shared/types/tests";

interface PageProps extends TestProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    // const dispatch = useAppDispatch()
    // const { pathname } = useLocation()
    // const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname))

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd
    })

    // useInitialEffect(() => {
    //     wrapperRef.current.scrollTop = scrollPosition
    // })

    // TODO fix restore scroll position feature

    // const onScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    //     console.log(e.currentTarget.scrollTop)
    //     dispatch(pageSliceActions.setScrollPosition({ position: e.currentTarget.scrollTop, path: pathname }))
    // }, 500)


    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            // onScroll={onScroll}
            data-testid={props["data-testid"] ?? 'Page'}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}></div> : null}
        </main>
    );
};
