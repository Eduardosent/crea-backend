import B2 from "backblaze-b2";
import { delimiter } from "path";

// B2_KEY_ID=005ad8bb9721b2b0000000002
// B2_APP_KEY=K005ryPLXWJVFaaDSpc7UvJ0F/cxIpE
// B2_ENDPOINT=https://s3.us-east-005.backblazeb2.com
const b2 = new B2({
  applicationKeyId: "005ad8bb9721b2b0000000002",
  applicationKey: "K005ryPLXWJVFaaDSpc7UvJ0F/cxIpE",
});

export async function eliminarArchivo(fileName: string) {
  try {
    // Autenticación
    await b2.authorize();

    // Listar archivos para obtener fileId del archivo que quieres borrar
    // const { data } = await b2.listFileNames({
    //   bucketId: "7a5d388bbbf9e722917b021b",
    //   prefix: fileName, // o '' si no usas prefix
    //   maxFileCount: 1,
    //   startFileName: "", // agregado
    //   delimiter: "", // agregado
    // });

    // const file = data.files.find((f) => f.fileName === fileName);

    // if (!file) {
    //   console.log("Archivo no encontrado");
    //   return;
    // }

    // const { fileId } = file;

    // Eliminar el archivo
    const res = await b2.deleteFileVersion({
      fileId: "",
      fileName,
    });

    console.log("Archivo eliminado correctamente:", res.data);
  } catch (err) {
    console.error("Error al eliminar el archivo:", err);
  }
}
