import { useEffect } from "react";
import React from "react";

// Supported tags inside <head>
const SUPPORTED_TAGS = new Set([
    "title",
    "base",
    "meta",
    "link",
    "script",
    "noscript",
    "style",
]);

// Helper to set HTML attributes safely
function setAttributes(target: HTMLElement, attrs: Record<string, any>) {
    Object.entries(attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            target.removeAttribute(key);
        } else {
            target.setAttribute(key, String(value));
        }
    });
}

/**
 * <ReactHead> — lightweight replacement for react-helmet
 * Supports all valid <head> tags + html/body/title attributes.
 */
export function ReactHead({
    children,
    htmlAttributes = {},
    bodyAttributes = {},
    titleAttributes = {},
}: {
    children?: React.ReactNode;
    htmlAttributes?: Record<string, any>;
    bodyAttributes?: Record<string, any>;
    titleAttributes?: Record<string, any>;
}) {
    useEffect(() => {
        if (typeof document === "undefined") return;

        const head = document.head;
        const html = document.documentElement;
        const body = document.body;

        // Apply attributes to <html> and <body>
        setAttributes(html, htmlAttributes);
        setAttributes(body, bodyAttributes);

        // Remove previous <react-head-lite> tags
        const oldTags = head.querySelectorAll("[data-react-head-lite]");
        oldTags.forEach((tag) => tag.remove());

        // Handle children
        React.Children.forEach(children, (child) => {
            // Skip non-elements (strings, null, fragments, etc.)
            if (!React.isValidElement(child)) return;

            // Explicitly type child as a ReactElement to access props safely
            const element = child as React.ReactElement<
                Record<string, any>,
                string | React.JSXElementConstructor<any>
            >;

            const { type, props } = element;

            if (type === "title") {
                document.title = props.children || "";
                const titleTag = document.querySelector("title");
                if (titleTag) setAttributes(titleTag, titleAttributes);
                return;
            }

            // Only allow supported head tags
            if (!SUPPORTED_TAGS.has(String(type))) return;

            const el = document.createElement(String(type));

            Object.entries(props).forEach(([key, value]) => {
                if (key === "children" || key === "dangerouslySetInnerHTML") return;
                el.setAttribute(key, value);
            });

            if (props.dangerouslySetInnerHTML?.__html) {
                el.innerHTML = props.dangerouslySetInnerHTML.__html;
            } else if (props.children) {
                el.textContent = props.children;
            }

            el.setAttribute("data-react-head-lite", "");
            head.appendChild(el);
        });

        // Cleanup old tags on unmount
        return () => {
            const tags = head.querySelectorAll("[data-react-head-lite]");
            tags.forEach((tag) => tag.remove());
        };
    }, [children, JSON.stringify(htmlAttributes), JSON.stringify(bodyAttributes)]);

    return null;
}
