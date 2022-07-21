// import { useState, useEffect } from 'react';
import {BehaviorSubject} from 'rxjs';
export const recevedApp$ = new BehaviorSubject(0);
export const validateApp$ = new BehaviorSubject(0);
export const rejectedApp$ = new BehaviorSubject(0);

// export const useApp = (stream) => {
//     const [data,setData] = useState();

//     useEffect(() => {
//         const sub = stream.subscribe(setData);
//         return sub.unsubscribe();
//     }, [stream])

//     return data;
// }