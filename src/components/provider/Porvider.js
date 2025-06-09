import React, { useContext, useState } from "react";

export const SidebarContext = React.createContext();

export function useSidebar() {
    return useContext(SidebarContext);
}

const TabsProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("all-course");
    const [courseId, setCourseId] = useState("");
    const [chapterId, setChaptersId] = useState("");
    const [chapterListDetail, setChapterListDetail] = useState({});
    const [courseNameList, setCourseNameList] = useState({});
    const [editCourseData, setEditCourseData] = useState({});


    const value = {
        activeTab,
        setActiveTab,
        courseId,
        setCourseId,
        chapterId,
        setChaptersId,
        chapterListDetail,
        setChapterListDetail,
        courseNameList,
        setCourseNameList,
        editCourseData,
        setEditCourseData
    };

    return (
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    );
};

export default TabsProvider;
