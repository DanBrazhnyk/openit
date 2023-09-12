import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import TitleNewReport from "../../../typography/YouSendReceive";
import Info from "../../../typography/newReportBio";
import { useLanguage } from "../../../hooks/LanguageProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { translations } from "../../../constants/translate";
import Pagination from "@mui/material/Pagination";

const NewReport = () => {
  const { currentLanguage } = useLanguage();

  const [newReports, setNewReports] = useState(false);
  const storedSenderEmail = localStorage.getItem("userEmail");
  const [formData, setFormData] = useState({
    bio: "",
    phone: "",
    senderEmail: storedSenderEmail,
    recipientEmail: "",
    location: "",
    report: "",
    file: null,
    subject: "",
  });

  const [errors, setErrors] = useState({
    bio: "",
    phone: "",
    senderEmail: storedSenderEmail,
    recipientEmail: "",
    location: "",
    report: "",
    file: "",
    subject: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    console.log(file);
  };

  const updateErrors = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    const strippedValue = inputValue.replace(/\s/g, "");

    if (strippedValue.startsWith("+")) {
      if (strippedValue.indexOf("+", 1) !== -1) {
        updateErrors("phone", "You can only have one '+' at the beginning.");
      } else {
        updateErrors("phone", "");
      }
    } else {
      updateErrors("phone", "");
    }

    const formattedPhone = strippedValue
      .replace(/\D/g, "")
      .replace(/(\d{1,3})(?=\d{3})/g, "$1 ");

    setFormData({ ...formData, phone: formattedPhone });
  };
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.subject);
    if (!formData.bio) {
      updateErrors("bio", "Please enter your name and surname.");
      return;
    } else {
      updateErrors("bio", "");
    }

    if (!formData.phone) {
      updateErrors("phone", "Please enter your phone.");
      return;
    } else {
      updateErrors("phone", "");
    }

    if (!formData.recipientEmail || !formData.recipientEmail.includes("@")) {
      updateErrors(
        "recipientEmail",
        "Please enter a valid recipient email address."
      );
      return;
    } else {
      updateErrors("recipientEmail", "");
    }

    if (!formData.location) {
      updateErrors("location", "Please select a location.");
      return;
    } else {
      updateErrors("location", "");
    }

    if (!formData.report) {
      updateErrors("report", "Please enter the report content.");
      return;
    } else {
      updateErrors("report", "");
    }

    if (!formData.file) {
      updateErrors("file", "Please upload a file.");
      return;
    } else {
      updateErrors("file", "");
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("senderEmail", formData.senderEmail);
      formDataToSend.append("recipientEmail", formData.recipientEmail);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("report", formData.report);
      formDataToSend.append("file", formData.file);
      formDataToSend.append("subject", formData.subject);

      const response = await axios.post(
        "http://localhost:8081/email",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Email sent:", response.data);
      setIsSnackbarOpen(true);

      setFormData({
        bio: "",
        phone: "",
        senderEmail: storedSenderEmail,
        recipientEmail: "",
        location: "",
        report: "",
        file: null,
        subject: "",
      });

      document.getElementById("file-input").value = "";
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const [reportsSender, setReportsSender] = useState([]);
  const [reportsRecipient, setReportsRecipient] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const responseSender = await axios.get(
          "http://localhost:8081/sender/reports",
          {
            params: { email: storedSenderEmail },
          }
        );
        const responseRecipient = await axios.get(
          "http://localhost:8081/recipient/reports",
          {
            params: { email: storedSenderEmail },
          }
        );
        console.log(responseSender.data);
        setReportsSender(responseSender.data);
        console.log(responseRecipient.data);
        setReportsRecipient(responseRecipient.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [storedSenderEmail]);
  const [openReportsSender, setOpenReportsSender] = useState({});

  // const toggleReportSender = (reportId) => {
  //   setOpenReportsSender((prevOpenReports) => ({
  //     ...prevOpenReports,
  //     [reportId]: !prevOpenReports[reportId],
  //   }));
  // };

  const [openReportsRecipient, setOpenReportsRecipient] = useState({});

  const toggleReportRecipient = (reportId) => {
    setOpenReportsRecipient((prevOpenReports) => ({
      ...prevOpenReports,
      [reportId]: !prevOpenReports[reportId],
    }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedSenderReports = reportsSender.slice(startIndex, endIndex);
  const paginatedRecipientReports = reportsRecipient.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const [showreportSender, setShowReportSender] = useState({
    id: "",
    showSender: "",
  });
  const [showreportRecipient, setShowReportRecipient] = useState({
    id: "",
    showRecipient: "",
  });

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        minHeight: "150vh",
        position: "relative", 
      }}
    >
      {newReports === false && (
        <>
          <div style={{ marginBottom: "40px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setNewReports(true)}
            >
              <AddIcon />
              {translations[currentLanguage].newSubmissions}
            </Button>
          </div>

          <div style={{ position: "relative",marginBottom:"25px"}}>

          {showreportRecipient.showRecipient !== true && (
            <>
              {paginatedSenderReports.length !== 0 && (
                <div
                  style={{
                    float: "left",
                    marginLeft: "20px",
                    width: "680px",
                    borderRadius: "15px",
                    border: "none"
                  }}
                >
                  <motion.p
                    initial={{ marginLeft: "246px" }}
                    style={{ marginBottom: "10px", width: "200px" }}
                    animate={{
                      marginLeft:
                        showreportSender.id !== "" ? "700px" : "246px",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {" "}
                    {translations[currentLanguage].youSend}
                  </motion.p>
                  {paginatedSenderReports.map((report) => (
                    <>
                      {showreportSender.showSender === "" && (
                        <motion.div
                          initial={{ height: "20px" }}
                          style={{
                            backgroundColor: "#163a7d",
                            marginBottom: "30px",
                            height: "150px",
                            borderRadius: "13px",
                            textAlign: "center",
                            width: "500px",
                            marginLeft: "98px",
                            overflowY: "hidden",
                          }}
                          key={report.id}
                          value={report.id}
                          animate={{
                            height:
                              showreportSender === report.id
                                ? "700px"
                                : "150px",
                            width:
                              showreportSender === report.id
                                ? "800px"
                                : "500px",
                            marginLeft:
                              showreportSender === report.id ? "250px" : "98px",
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <>
                            <p>{report.bio}</p>
                            <p>{report.subject}</p>
                            <Info>
                              Date of sending:
                              {new Date(report.timestamp)
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .reverse()
                                .slice(1)
                                .concat(
                                  new Date(report.timestamp)
                                    .toLocaleDateString("en-GB")
                                    .split("/")
                                    .reverse()
                                    .slice(0, 1)
                                )
                                .join(".")}{" "}
                              {new Date(report.timestamp).toLocaleTimeString(
                                "en-GB",
                                {
                                  hour12: false,
                                }
                              )}
                            </Info>
                            <Button
                              key={report.id}
                              onClick={() =>
                                setShowReportSender({
                                  id: report.id,
                                  showSender: true,
                                })
                              }
                              sx={{ color: "white" }}
                            >
                              Open
                            </Button>
                          </>
                        </motion.div>
                      )}
                      {showreportSender.id === report.id && (
                        <motion.div
                          style={{
                            backgroundColor: "#163a7d",
                            marginBottom: "30px",
                            borderRadius: "13px",
                            textAlign: "center",
                            width: "500px",
                            marginLeft: "98px",
                            overflowY: "hidden",
                          }}
                          key={report.id}
                          value={report.id}
                          animate={{
                            height:
                              showreportSender.id === report.id
                                ? "700px"
                                : "150px",
                            width:
                              showreportSender.id === report.id
                                ? "800px"
                                : "500px",
                            marginLeft:
                              showreportSender.id === report.id
                                ? "390px"
                                : "98px",
                          }}
                          transition={{ duration: 0.5, type: "tweet" }}
                        >
                          <Info>
                            {" "}
                            {translations[currentLanguage].name}: {report.bio}
                          </Info>
                          <Info>From : {report.recipientEmail}</Info>
                          <Info>Report {report.report}</Info>
                          <Info>
                            Date of sending:
                            {new Date(report.timestamp)
                              .toLocaleDateString("en-GB")
                              .split("/")
                              .reverse()
                              .slice(1)
                              .concat(
                                new Date(report.timestamp)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .reverse()
                                  .slice(0, 1)
                              )
                              .join(".")}{" "}
                            {new Date(report.timestamp).toLocaleTimeString(
                              "en-GB",
                              {
                                hour12: false,
                              }
                            )}
                          </Info>
                          <Button
                            key={report.id}
                            onClick={() =>
                              setShowReportSender({ id: "", showSender: "" })
                            }
                            sx={{ background: "black" }}
                          >
                            Close
                          </Button>
                        </motion.div>
                      )}
                    </>
                  ))}
                </div>
              )}
            </>
          )}

          {showreportSender.showSender !== true && (
            <>
              {paginatedRecipientReports.length !== 0 && (
                <div
                  style={{
                    marginLeft:"950px",
                    width: "380px",
                    borderRadius: "15px",
                    border: "none"
                  }}
                >
                  <motion.p
                    initial={{ marginLeft: "246px" }}
                    style={{ marginBottom: "10px", width: "200px" }}
                    animate={{
                      marginRight:
                        showreportRecipient.id !== "" ? "700px" : "246px",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {translations[currentLanguage].youReceive}
                  </motion.p>
                  {paginatedRecipientReports.map((report) => (
                    <>
                      {showreportRecipient.showRecipient === "" && (
                        <motion.div
                          initial={{ height: "20px" }}
                          style={{
                            backgroundColor: "#163a7d",
                            marginBottom: "30px",
                            height: "150px",
                            borderRadius: "13px",
                            textAlign: "center",
                            width: "500px",
                            overflowY: "hidden",
                          }}
                          key={report.id}
                          value={report.id}
                          animate={{
                            height:
                              showreportRecipient === report.id
                                ? "700px"
                                : "150px",
                            width:
                              showreportRecipient === report.id
                                ? "800px"
                                : "500px",
                            marginRight:
                              showreportRecipient === report.id
                                ? "650px"
                                : "98px",
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <>
                            <p>{report.bio}</p>
                            <p>{report.subject}</p>
                            <Info>
                              Date of sending:
                              {new Date(report.timestamp)
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .reverse()
                                .slice(1)
                                .concat(
                                  new Date(report.timestamp)
                                    .toLocaleDateString("en-GB")
                                    .split("/")
                                    .reverse()
                                    .slice(0, 1)
                                )
                                .join(".")}{" "}
                              {new Date(report.timestamp).toLocaleTimeString(
                                "en-GB",
                                {
                                  hour12: false,
                                }
                              )}
                            </Info>
                            <Button
                              key={report.id}
                              onClick={() =>
                                setShowReportRecipient({
                                  id: report.id,
                                  showRecipient: true,
                                })
                              }
                              sx={{ color: "white" }}
                            >
                              Open
                            </Button>
                          </>
                        </motion.div>
                      )}
                      {showreportRecipient.id === report.id && (
                        <motion.div
                          style={{
                            backgroundColor: "#163a7d",
                            marginBottom: "60px",
                            borderRadius: "13px",
                            textAlign: "center",
                            width: "500px",
                            overflowY: "hidden",
                            
                          }}
                          key={report.id}
                          value={report.id}
                          animate={{
                            height:
                              showreportRecipient.id === report.id
                                ? "auto"
                                : "150px",
                            width:
                              showreportRecipient.id === report.id
                                ? "800px"
                                : "500px",  
                              marginLeft:
                              showreportRecipient.id === report.id
                                ? "-520px"
                                : "10px",
                         
                          }}
                          transition={{ duration: 0.5, type: "tweet" }}
                        >
                          <Info>
                            {" "}
                            {translations[currentLanguage].name}: {report.bio}
                          </Info>
                          <Info>From : {report.recipientEmail}</Info>
                          <Info>Report {report.report}</Info><Info>Report {report.report}</Info><Info>Report {report.report}</Info>
                          <Info>
                            Date of sending:
                            {new Date(report.timestamp)
                              .toLocaleDateString("en-GB")
                              .split("/")
                              .reverse()
                              .slice(1)
                              .concat(
                                new Date(report.timestamp)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .reverse()
                                  .slice(0, 1)
                              )
                              .join(".")}{" "}
                            {new Date(report.timestamp).toLocaleTimeString(
                              "en-GB",
                              {
                                hour12: false,
                              }
                            )}
                          </Info>
                          <Button
                            key={report.id}
                            onClick={() =>
                              setShowReportRecipient({ id: "", showRecipient: "" })
                            }
                            sx={{ background: "black" }}
                          >
                            Close
                          </Button>
                        </motion.div>
                      )}
                    </>
                  ))}
                </div>
              )}
            </>
          )}
          </div>

          <Pagination
            count={Math.ceil(
              Math.max(reportsSender.length, reportsRecipient.length) /
                itemsPerPage
            )}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              position: "absolute", 
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)", 
            }}
          />
        </>
      )}
      {newReports && (
        <div
          style={{
            marginLeft: "480px",
            height: "700px",
            marginTop: "130px",
            width: "700px",
            paddingTop: "25px",
            border: "15px solid #163a7d",
            borderRadius: "25px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#163a7d", fontSize: "21px" }}>
            Your Submission
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "27px" }}>
            <div>
              <TextField
                label={translations[currentLanguage].name}
                required
                fullWidth
                margin="normal"
                sx={{ width: "250px", mr: "54px" }}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
                error={!!errors.bio}
                helperText={errors.bio}
              />
              <TextField
                label="Temat"
                required
                sx={{ width: "250px", mt: "15px" }}
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
              />
            </div>

            <div>
              <TextField
                label={translations[currentLanguage].phone}
                required
                fullWidth
                margin="normal"
                sx={{
                  width: "250px",
                }}
                value={formData.phone}
                onChange={handlePhoneChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <FormControl
                fullWidth
                margin="normal"
                sx={{
                  width: "250px",
                  marginLeft: "45px",
                }}
              >
                <InputLabel>
                  {translations[currentLanguage].location}
                </InputLabel>
                <Select
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  error={!!errors.location}
                >
                  <MenuItem value="">
                    {translations[currentLanguage].selectLocation}
                  </MenuItem>
                  <MenuItem value="Warsaw">Warsaw</MenuItem>
                  <MenuItem value="Cracow">Cracow</MenuItem>
                  <MenuItem value="Wroclaw">Wroclaw</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <TextField
                label={translations[currentLanguage].fromEmail}
                required
                fullWidth
                margin="normal"
                sx={{
                  width: "250px",
                  marginRight: "50px",
                }}
                value={formData.senderEmail}
              />
              <TextField
                label={translations[currentLanguage].toEmail}
                required
                fullWidth
                margin="normal"
                sx={{
                  width: "250px",
                }}
                value={formData.recipientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, recipientEmail: e.target.value })
                }
                error={!!errors.recipientEmail}
                helperText={errors.recipientEmail}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "33px",
                marginBottom: "25px",
              }}
            >
              <input
                id="file-input"
                accept="image/*,.pdf,.doc,.docx"
                type="file"
                style={{
                  marginLeft: "155px",
                  backgroundColor: "black",
                  width: "86px",
                  display: "none",
                }}
                onChange={(e) => handleFileUpload(e)}
              />
              <label htmlFor="file-input">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ backgroundColor: "purple" }}
                >
                  {currentLanguage === "en" ? "Choose File" : "Wybierz Plik"}
                </Button>
              </label>
              {formData.file !== null && (
                <div style={{ marginLeft: "15px" }}>{formData.file.name}</div>
              )}
            </div>
            <div
              style={{
                border: "8px solid #98989C",
                width: "550px",
                height: "220px",
                marginLeft: "75px",
                borderRadius: "14px",
              }}
            >
              <label
                htmlFor="treść"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#163a7d",
                }}
              >
                {translations[currentLanguage].reportContent}
              </label>
              <textarea
                id="treść"
                style={{ width: "450px", height: "150px", resize: "none" }}
                value={formData.report}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    report:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  })
                }
                error={!!errors.report}
              />
              <div style={{ color: "red" }}>{errors.file}</div>
            </div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: "30px" }}
              onClick={handleSubmit}
            >
              {translations[currentLanguage].send}
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: "30px", marginLeft: "267px" }}
              onClick={() => setNewReports(false)}
            >
              {translations[currentLanguage].close}
            </Button>
          </form>

          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={() => setIsSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              You have successfully Sent!
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default NewReport;
