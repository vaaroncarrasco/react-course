import { db } from "../firebase/firebase-config"

// ? Async fn() return promises -> await them where you call em
export const loadNotes = async (uid) => {

    // ? notesSnapshot {}
    const notesSnap =  await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    // * {}.forEach() -> method that loops thru prop docs: []
    notesSnap.forEach( snapHijo => {
        // console.log(snapHijo.data); // each []element

        // push elements to our notes[] with snapHijo.id
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return notes;
}