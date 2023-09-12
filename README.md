# openit

1)Logowanie

W loginie i haśle użytkownik wskazuje dane, które podał podczas rejestracji, jeśli wszystko zostało określone poprawnie, 
użytkownik zostanie przekierowany na stronę główną, w przeciwnym razie wyświetli się błąd.

Login

In the login and password, the user indicates the data that he provided during registration, 
if everything was specified correctly, the user will be redirected to the main page, otherwise an error will be displayed.

2)Rejestracja 

Użytkownik podczas rejestracji podaje swoje prawdziwe imię i nazwisko, a także wskazuje adres e-mail, pod którym chce się zarejestrować.
Użytkownik może określić dowolne hasło, ponieważ jest ono bezpieczne dzięki funkcji mieszania hasła.
W zależności od wybranej roli dostępne będą różne funkcjonalności i funkcje (na przykład strony, które można przeglądać), których inni użytkownicy mogą nie mieć.
Po pomyślnej rejestracji zostanie wyświetlone okno modalne informujące o pomyślnej rejestracji, jeśli coś pójdzie nie tak, użytkownik zostanie pokazane, gdzie wystąpił błąd.

Registration

When registering, the user provides his real name and surname and also indicates the e-mail address under which he wants to register.
User can specify any password as it is safe with password hash function.
Depending on the role you choose, you will have different functionalities and features (for example, pages you can browse) that other users may not have.
After successful registration, a modal window will be displayed informing about the successful registration, if something goes wrong, the user will be shown where the error occurred.


3)Zapomniałeś hasła

W tej sekcji możesz podać swój zarejestrowany adres e-mail (jeżeli taki adres nie istnieje w bazie danych, pojawi się błąd ).
Po kliknięciu przycisku „wyślij” na Twój adres e-mail zostanie wysłany token umożliwiający zresetowanie hasła, a także pojawi się licznik czasu informujący,
ile czasu masz na wprowadzenie tego tokena (ponieważ jest on przechowywany tymczasowo), 
a także będziesz musiał wprowadzić w tym czasie nowe hasło. Jeżeli token został wprowadzony błędnie nastąpi błąd, błąd wystąpi również w przypadku nie wpisania nowego hasła.
Jeżeli rejestracja przebiegła pomyślnie, wyświetli się okno modalne informujące o pomyślnym ustawieniu nowego hasła i zostaniesz przekierowany na stronę logowania.

Forgot password

In this section you can enter your registered e-mail address (if such an address does not exist in the database, an error will appear).
After clicking the "send" button, a token will be sent to your email address to reset your password, and a timer will appear informing you
how much time you have to enter this token (since it is stored temporarily),
and you will also need to enter a new password at this time. If the token was entered incorrectly, an error will occur, and an error will also occur if you do not enter a new password.
If registration was successful, a modal window will appear informing you that you have successfully set your new password and you will be redirected to the login page.

4)Strona główna

Na naszej stronie są 4 role: student, pracownik, administrator, serwisant.
W zależności od roli dostępna będzie różna liczba stron.
Funkcjonalność niektórych ról jest inna, np. student i pracownik mogą pisać do kogoś raporty i podawać informacje o sobie (w tym numer telefonu),
załączyć plik zawierający szczegóły, temat raportu i dokładnie opisać, czego dotyczy raport.
Osoba, do której został wysłany raport, otrzyma go e-mailem, a także będzie mogła go zobaczyć po wejściu na stronę główną w sekcji raportów.
Do każdego raportu możesz dodać komentarz, a także sprawdzić status raportu (wysłany, odpowiedź na raport otrzymanа)
Pragnę również zaznaczyć, że serwisant nie może wysyłać raportów, ale ma wgląd w całą historię zgłoszeń, niezależnie od tego, czy zostały do ​​niego wysłane, czy nie.
Na stronie raportów możesz zobaczyć wszystkie wysłane raporty oraz ich status, możesz także dodać nowy raport klikając przycisk „Nowe zgłoszenia”.
Po pomyślnym przesłaniu raportu zostanie wyświetlone okno modalne informujące o pomyślnym przesłaniu raportu.
Na naszej stronie znajdują się również informacje kontaktowe, które każdy użytkownik może zobaczyć, obejrzeć budynki na mapie, uzyskać więcej informacji, a także sprawdzić lokalizację budynków na zdjęciach.

Main page

There are 4 roles on our website: student, employee, administrator, service technician.
Depending on the role, there will be a different number of pages available.
The functionality of some roles is different, e.g. a student and an employee can write reports to someone and provide information about themselves (including their phone number),
attach a file containing details, the subject of the report and describe exactly what the report is about.
The person to whom the report was sent will receive it by e-mail and will also be able to see it after entering the home page in the reports section.
You can add a comment to each report and check the report status (sent, response to report received)
I would also like to point out that the service technician cannot send reports, but he has access to the entire history of reports, regardless of whether they were sent to him or not.
On the reports page you can see all sent reports and their status, you can also add a new report by clicking the "New reports" button.
Once the report has been successfully submitted, a modal window will appear informing you that the report has been successfully submitted.
Our website also has contact information that every user can see, see the buildings on the map, get more information, and check the location of the buildings in the photos.

5)Języki

Każdy użytkownik może wybrać język strony, do wyboru jest polski i angielski.Wszystkie błędy i informacje (w tym okna modalne ) dla wygody użytkownika będą w wybranym przez niego języku.

Languages
Each user can choose the language of the website, Polish and English to choose from. All errors and information (including modal windows) will be in the language chosen for the user's convenience.
