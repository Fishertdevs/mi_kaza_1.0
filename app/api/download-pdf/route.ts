import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    // Construir la ruta al archivo PDF
    const filePath = path.join(process.cwd(), "public", "manual-usuario.pdf")

    // Verificar si el archivo existe
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error("Error al acceder al archivo PDF:", error)
      return NextResponse.json({ error: "El archivo PDF no existe o no se puede acceder a él" }, { status: 404 })
    }

    // Leer el archivo
    const fileBuffer = await fs.readFile(filePath)

    // Configurar los headers para la descarga
    const headers = new Headers()
    headers.set("Content-Type", "application/pdf")
    headers.set("Content-Disposition", `attachment; filename="Manual_Usuario_MiKaza_2025.pdf"`)

    // Devolver el archivo como respuesta
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error al descargar el PDF:", error)
    return NextResponse.json({ error: "Error al procesar la descarga del PDF" }, { status: 500 })
  }
}
