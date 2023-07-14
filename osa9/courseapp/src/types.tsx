// 9.15 type interface CoursePart

interface CoursePartBase { // base interface
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase { // base interface with description
    description: string;
}

interface CoursePartGroup extends CoursePartBase { // group interface
    groupProjectCount: number;
    kind: "group"
}


interface CoursePartBasic extends CoursePartBaseWithDescription { // basic interface with description
    kind: "basic";
}

interface CoursePartBackground extends CoursePartBaseWithDescription { // background interface with description
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription { // special interface with description
    kind: "special";
    requirements: string[];
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial; // union type CoursePart