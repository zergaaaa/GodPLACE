import { type NextRequest, NextResponse } from "next/server"

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_API_BASE = "https://discord.com/api/v10"

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Début de l'envoi Discord...")

    if (!DISCORD_BOT_TOKEN) {
      console.error("❌ Token Discord manquant")
      return NextResponse.json({ error: "Token Discord non configuré" }, { status: 500 })
    }

    const { channelId, imageUrl, category, week } = await request.json()
    console.log("📝 Données reçues:", { channelId, imageUrl, category, week })

    if (!channelId || !imageUrl) {
      return NextResponse.json({ error: "Channel ID et URL d'image requis" }, { status: 400 })
    }

    console.log("📥 Téléchargement de l'image...")
    // Télécharger l'image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      console.error("❌ Erreur téléchargement image:", imageResponse.status)
      throw new Error(`Impossible de télécharger l'image: ${imageResponse.status}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const imageBlob = new Blob([imageBuffer])
    console.log("✅ Image téléchargée, taille:", imageBuffer.byteLength, "bytes")

    // Préparer les données pour Discord
    const formData = new FormData()

    // Ajouter le message
    const messageContent = {
      content: `**${category}** - ${week}`,
    }

    formData.append("payload_json", JSON.stringify(messageContent))

    // Ajouter l'image
    const filename = `${category}_${week}.png`.replace(/[^a-zA-Z0-9._-]/g, "_")
    formData.append("files[0]", imageBlob, filename)

    console.log("📤 Envoi vers Discord API...")
    console.log("🔗 URL:", `${DISCORD_API_BASE}/channels/${channelId}/messages`)
    console.log("🔑 Token présent:", !!DISCORD_BOT_TOKEN)

    // Envoyer à Discord
    const discordResponse = await fetch(`${DISCORD_API_BASE}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        // Ne pas ajouter Content-Type pour FormData
      },
      body: formData,
    })

    console.log("📨 Réponse Discord:", discordResponse.status, discordResponse.statusText)

    if (!discordResponse.ok) {
      const errorData = await discordResponse.text()
      console.error("❌ Erreur Discord API:", {
        status: discordResponse.status,
        statusText: discordResponse.statusText,
        error: errorData,
      })

      // Messages d'erreur plus spécifiques
      if (discordResponse.status === 401) {
        throw new Error("Token Discord invalide ou expiré")
      } else if (discordResponse.status === 403) {
        throw new Error("Le bot n'a pas les permissions pour ce salon")
      } else if (discordResponse.status === 404) {
        throw new Error("Salon Discord introuvable")
      } else {
        throw new Error(`Erreur Discord API: ${discordResponse.status} - ${errorData}`)
      }
    }

    const result = await discordResponse.json()
    console.log("✅ Message envoyé avec succès:", result.id)

    return NextResponse.json({
      success: true,
      messageId: result.id,
      message: "Message envoyé avec succès",
    })
  } catch (error: any) {
    console.error("❌ Erreur complète envoi Discord:", error)
    return NextResponse.json(
      {
        error: error.message || "Erreur interne du serveur",
        details: error.stack,
      },
      { status: 500 },
    )
  }
}
