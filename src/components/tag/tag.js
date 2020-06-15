import React, { createContext, useContext, useReducer } from 'react';
import { Tag } from 'antd';

export const TagContext = createContext({})

export const CLICK_TAG = "CLICK_TAG"
export const ADD_TAG = "ADD_TAG"

export const tagReducer = (state, action) => {
    const colorList = [
        "magenta", "red", "volcano", "orange", "gold", "lime",
        "green", "cyan", "blue", "geekblue", "purple"
    ]
    let { activeList, tagList, colorMap } = state
    const tag = action.tag
    switch (action.type) {
        case CLICK_TAG:
            const index = activeList.indexOf(tag) 
            if ( index > -1) {
                activeList.splice(index, 1)
                if (tag === "全部") activeList = []
                return {...state, activeList}
            } else {
                activeList.push(tag)
                if (tag === "全部") activeList = [...tagList].splice(0, tagList.length-1)
                return {...state, activeList}
            }
        case ADD_TAG:
            if (tagList.indexOf(tag) === -1) {
                colorMap[tag] = colorList[tagList.length]
                // keep "Draft" tag to the end
                if (tagList.indexOf("Draft") !== -1) {
                    tagList.splice(tagList.length-1, 0, tag)
                } else {
                    tagList.push(tag)
                }
                if (tag !== "Draft") // Default set "Draft" tag inactive
                    activeList.push(tag)
                return {...state, activeList, tagList}
            }
            return state
        default:
            return state
    }
}

const TopTag = (props) => {
    const {state, dispatch} = useContext(TagContext)
    const { colorMap, activeList } = state
    // console.log(state)
    const color = activeList.indexOf(props.tag) === -1 ? 
                    "" : colorMap[props.tag]
    return (<Tag color={ color }
                onClick={()=>dispatch({type: CLICK_TAG, tag: props.tag})}
            >
                {props.tag}
            </Tag>)
}

export const TopTagList = (props) => {
    const {state} = useContext(TagContext);
    let tags = state.tagList
    let tagList = []
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        tagList.push(<TopTag key={i} tag={tag}/>)
    }
    return (
        <div style={{borderBottom: "1px solid #aaa", padding: "0 10px 10px 10px", marginBottom: 10}}>
            Tags: &nbsp;&nbsp;
            {tagList}
        </div>
    )
}

export const ArticleTagList = (props) => {
    const tags = props.tags || [];
    let tagList = []
    const {state} = useContext(TagContext);

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        tagList.push(<Tag key={i} color={state.colorMap[tag]}>{tag}</Tag>)
    }
    return (<div>{tagList}</div>)
}

export const TagContextWrapper = (props) => {
    const initialState = {tagList: ["全部"], activeList: ["全部"], colorMap: {"全部": "#f5b1aa"}}
    const [state, dispatch] = useReducer(tagReducer, initialState)
    return (
        <TagContext.Provider value={{state, dispatch}}>
            {props.children}
        </TagContext.Provider>
    )
}