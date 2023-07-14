
export interface DiaryEntry { // 9.16 interface for diary entries
    id: number;
    date: string;
    visibility: string;
    weather: string;
    comment: string;
}


export interface NewDiaryEntry { // 9.17 interface for new diary entries
    date: string;
    visibility: string;
    weather: string;
    comment: string;
}
