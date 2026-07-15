export async function pushLeadToNeodove(formData: {
    name: string;
    phone: string;
    email?: string;
    location?: string;
    message?: string;
}) {
    const payload = {
        name: formData.name || "Unknown",
        mobile: formData.phone ? Number(formData.phone.replace(/\D/g, '')) : 0,
        email: formData.email || "",
        detail1: formData.location || "",
        detail2: formData.message || "Website Lead"
    };

    try {
        const res = await fetch('https://6513442b-f879-45c9-be19-944f45086e60.neodove.com/integration/custom/1e376832-40d7-47df-bb80-682287d9e15a/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Neodove CRM error:", errorText);
            return false;
        }
        
        console.log("✅ Successfully pushed lead to Neodove CRM");
        return true;
    } catch (error) {
        console.error("❌ Failed to push to Neodove CRM:", error);
        return false;
    }
}
