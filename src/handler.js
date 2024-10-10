const { nanoid } = require('nanoid');
const notes = require('./notes');

const handler = {
  
    addNote : (req, h) =>{

      const { title, tags, body } = req.payload;
      const date = new Date()
      const id = `${date.getFullYear()}-${nanoid(16)}`;
      console.log(id);
      
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const newnote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
      };

      notes.push(newnote)
      
      const isSuccess = notes.filter((note) => note.id === id).length > 0;
      // console.log(isSuccess);

      if (isSuccess){
        const response = h.response({
          status: 'success',
          message: 'catatan berhasil ditambahkan',
          data:{
            noteId: id
          }
        });
        response.code(200);
        return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'catatan gagal ditambahkan',
        });

        response.code(500);
        response.header('Access-Control-Allow-Origin', '*');

        return response
    },
    getAllNotes: (req, h)=> {
       return {status: 200,
      data: {
        notes
      }
    }},

    getNoteById: (req, h) => {
        const {id}  =  req.params;
        
        const note = notes.filter(note => note.id === id)[0]
        if(notes !== undefined){
          return {
            status: 200,
            data:{
              note,
            }
        }
      }

      const response = h.response({
        status : 'fail',
        message: 'catatan tidak ditemukan'
      })
      response.code(404)

      return response



  },

  editNoteById: (req, h) =>{
    const {id} = req.params
    const {title, tags, body} = req.payload
    const updatedAt = new Date().toISOString()
    const index = notes.findIndex(note => note.id === id )

    if(index !== -1){
      notes[index] ={
        ...notes[index],
        title,
        tags,
        body,
        updatedAt
      }
      return h.response({status: 'success', message: 'catatan berhasil diperbarui'})
        .code(200)
      

    }
    return h.response({status: 'fail', message: 'gagal memperbarui catatan, id tidak ditemukan'})
        .code(404)
  },

  deleteNoteById: (req, h)=> {
      const {id} = req.params
      const index = notes.findIndex(note => note.id === id)
      // notes = notes.filter(note => note.id !== id)
      console.log(index);
      
      if(index !== -1){
        notes.splice(index, 1)
        return h.response({
          status: 'success',
          message: 'berhasil menghapus catatan'
        }).code(200)
      }

        return h.response({
        status: 'fail',
        message: 'gagal menghapus catatan, id tidak ditemukan'
      }).code(404)
      
     
  }
}

module.exports = handler