// src/app/auth/check-email/page.tsx

export default function CheckEmailPage() {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-xl font-bold">📧 E-Mail versendet</h1>
          <p className="mt-4 text-gray-700">
            Bitte überprüfe deine E-Mails und klicke auf den Bestätigungslink, um dein Konto zu aktivieren.
          </p>
        </div>
      </main>
    )
  }