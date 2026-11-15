// =========================================================================
// KODE GOOGLE APPS SCRIPT UNTUK MENYAMBUNGKAN NEP-NEP KE GOOGLE SPREADSHEET
// =========================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat header otomatis jika baris pertama masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Waktu Input",
        "Tanggal Jurnal",
        "Mood",
        "Progres (%)",
        "Total Tugas",
        "Selesai",
        "Pencapaian Utama",
        "Catatan & Evaluasi",
        "Detail Checklist"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#4f46e5").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);
    var waktuSekarang = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([
      waktuSekarang,
      data.tanggal || "-",
      data.mood || "-",
      data.progres || "0%",
      data.totalTugas || 0,
      data.selesai || 0,
      data.pencapaianUtama || "-",
      data.catatan || "-",
      data.detailChecklist || "-"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data berhasil disimpan ke Spreadsheet!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Endpoint Nep-Nep Journal Aktif!");
}
