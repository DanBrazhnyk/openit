import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Info from "../../../typography/Info";
import { useLanguage } from "../../../hooks/LanguageProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { translations } from "../../../constants/translate";
import Pagination from "@mui/material/Pagination";
import NewReportContainer from "../../../templates/newReportContainer";
import NewSubmissions from "../../../buttons/newSubmissionBtn";
import ReportContainer from "../../../templates/reportsContainer";
import AllReports from "../../../typography/allReports";
import ReportElementContainer from "../../../templates/ReportElementContainer";
import Open from "../../../buttons/Open";
import DateOfSending from "../../../typography/DateofSending";
import BioContainer from "../../../templates/bioConatiner";
import Close from "../../../buttons/Close";
import Textarea from "@mui/joy/Textarea";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const NewReport = () => {
  const { currentLanguage } = useLanguage();
  const [userRole, setUserRole] = useState("viewer");
  const [newReports, setNewReports] = useState(false);
  const storedSenderEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

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
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const responseGetEmails = await axios.get(
          "http://localhost:8081/getEmails"
        );
        const messagesArray = responseGetEmails.data;
        setAllMessages(messagesArray);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [storedSenderEmail]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const [showreportSender, setShowReportSender] = useState({
    id: "",
    showSender: "",
  });
  const [status, SetStatus] = useState("");
  const [receipter, setreceipter] = useState("");
  const [idRecipient, setIdRecipient] = useState("");
  const [addComment, SetAddComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getComments");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (showreportSender.id) {
      fetchComments();
    }
  }, [showreportSender.id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getComments");
      setComments(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке комментариев", error);
    }
  };

  const handleSubmitComment = async () => {
    try {
      const response = await axios.post("http://localhost:8081/comments", {
        commenter_email: storedSenderEmail,
        recipient_id: idRecipient,
        comment_text: commentText,
        recipientEmail: receipter,
      });
      if (response.status === 200) {
        alert("all good");
        SetAddComment(false);
        setCommentText("");
        console.log(response);
        fetchComments();
      }
    } catch (error) {
      console.error("Error handling comment:", error);
    }
  };
  const filteredMessages = allMessages.filter((message) => {
    return (
      message.senderEmail === storedSenderEmail ||
      message.recipientEmail === storedSenderEmail
    );
  });
  const paginatedSenderReports = filteredMessages.slice(startIndex, endIndex);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:8081/deleteComment`, {
        comment_id: commentId,
      });
      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.comment_id !== commentId
        );
        setComments(updatedComments);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const [editItem, setEditItem] = useState(false);
  const handleSaveComment = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:8081/editComment`, {
        comment_id: commentId,
        comment_text: editCommentText,
      });
      if (response.status === 200) {
        const updatedComments = comments.map((comment) => {
          if (comment.comment_id === commentId) {
            return { ...comment, comment_text: editCommentText };
          }
          return comment;
        });
        setComments(updatedComments);
        setEditItem(false);
        setEditCommentId(null);
        setEditCommentText("");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };
  const handleEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };
  const [selectedDefaultAnswer, setSelectedDefaultAnswer] = useState("");
  return (
    <NewReportContainer>
      {newReports === false && (
        <>
          {userRole !== "4" && (
            <>
              <NewSubmissions
                onClick={() => setNewReports(true)}
                text={translations[currentLanguage].newSubmissions}
              />

              {paginatedSenderReports.length !== 0 && (
                <>
                  <AllReports>
                    {translations[currentLanguage].youSend}
                  </AllReports>
                  <ReportContainer>
                    {paginatedSenderReports.map((report) => (
                      <>
                        {showreportSender.showSender === "" && (
                          <ReportElementContainer
                            initialHeight="20px"
                            initialWidth="500px"
                            id={report.id}
                            value={report.value}
                            scale={1.1}
                          >
                            <BioContainer
                              bio={report.bio}
                              subject={report.subject}
                            />
                            <DateOfSending timestamp={report.timestamp} />
                            <Open
                              key={report.id}
                              onClick={() => {
                                setShowReportSender({
                                  id: report.id,
                                  showSender: true,
                                });
                                setreceipter(report.recipientEmail);
                                setIdRecipient(report.id);
                              }}
                              text="Open"
                            />
                          </ReportElementContainer>
                        )}
                        {showreportSender.id === report.id && (
                          <ReportElementContainer
                            initialHeight="200px"
                            initialWidth="700px"
                            id={report.id}
                            value={report.value}
                            height={
                              showreportSender.id === report.id
                                ? "auto"
                                : "150px"
                            }
                            width={
                              showreportSender.id === report.id
                                ? "850px"
                                : "700px"
                            }
                            marginLeft={
                              showreportSender.id === report.id ? "79px" : "0px"
                            }
                          >
                            <Info
                              bio={report.bio}
                              from={report.recipientEmail}
                              report={report.report}
                            />
                            <DateOfSending timestamp={report.timestamp} />
                            <div
                              style={{
                                marginTop: "25px",
                                backgroundColor: "white",
                                marginLeft: "55px",
                                borderRadius: "15px",
                                width: "750px",
                                paddingBottom: "25px",
                              }}
                            >
                              <div>
                                <p
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                  }}
                                >
                                  Comments
                                </p>
                              </div>
                              <div style={{ marginTop: "25px" }}>
                                {comments.map((comment) => {
                                  if (
                                    comment.recipient_id === showreportSender.id
                                  ) {
                                    return (
                                      <div
                                        key={comment.comment_id}
                                        style={{
                                          backgroundColor: "#163a7d",
                                          marginBottom: "20px",
                                          marginLeft: "54px",
                                          width: "650px",
                                          borderRadius: "15px",
                                          minHeight: "90px",
                                          paddingBottom: "27px",
                                        }}
                                      >
                                        <div
                                          key={comment.comment_id}
                                          style={{
                                            float: "left",
                                            marginTop: "20px",
                                            marginLeft: "19px",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            color: "white",
                                            display: "flex",
                                          }}
                                        >
                                          {comment.commenter_email ===
                                          storedSenderEmail
                                            ? "You"
                                            : comment.commenter_email}

                                          <div style={{ marginTop: "-27px" }}>
                                            <DateOfSending
                                              marginLeft="20px"
                                              timestamp={comment.timestamp}
                                            />
                                            {comment.commenter_email ===
                                              storedSenderEmail &&
                                              editItem === false && (
                                                <div style={{marginTop:"-25px"}}>
                                                  <DeleteIcon
                                                    style={{
                                                      color: "white",
                                                      marginLeft: "450px",
                                                    }}
                                                    onClick={() => {
                                                      handleDeleteComment(
                                                        comment.comment_id
                                                      );
                                                    }}
                                                  />
                                                  <EditIcon
                                                    style={{
                                                      color: "white",
                                                      marginLeft: "20px",
                                                    }}
                                                    onClick={() => {
                                                      setEditItem(true);
                                                      setEditCommentId(
                                                        comment.comment_id
                                                      );
                                                      handleEditComment(
                                                        comment.comment_id,
                                                        comment.comment_text
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              )}
                                          </div>
                                        </div>
                                        {editCommentId ===
                                          comment.comment_id && (
                                          <div style={{ paddingTop: "70px" }}>
                                            <Textarea
                                              minRows={2}
                                              variant="outlined"
                                              sx={{
                                                height: "auto",
                                                width: "410px",
                                                marginBottom: "30px",
                                                marginLeft: "115px",
                                              }}
                                              value={editCommentText}
                                              onChange={(e) =>
                                                setEditCommentText(
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <div style={{ marginTop: "15px" }}>
                                              <button
                                                style={{
                                                  background: "#98989C",
                                                  color: "#163a7d",
                                                  borderRadius: "16px",
                                                  border: "none",
                                                  height: "47px",
                                                  fontWeight: "bold",
                                                  fontSize: "15px",
                                                  width: "147px",
                                                  marginRight: "46px",
                                                }}
                                                onClick={() =>
                                                  handleSaveComment(
                                                    comment.comment_id
                                                  )
                                                }
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                        {editItem === false && (
                                          <div
                                            style={{
                                              fontWeight: "bold",
                                              fontSize: "18px",
                                              color: "white",
                                              paddingTop:"100px"
                                            }}
                                          >
                                            {comment.comment_text}
                                          </div>
                                        )}
                                      </div>
                                      
                                    );
                                  }
                                  return null;
                                })}
                              </div>

                              {addComment === false && (
                                <button
                                  style={{
                                    background: "#98989C",
                                    color: "#163a7d",
                                    borderRadius: "16px",
                                    border: "none",
                                    height: "47px",
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    width: "150px",
                                  }}
                                  onClick={() => SetAddComment(true)}
                                >
                                  Add comment
                                </button>
                              )}
                              {addComment === true && (
                                <>
                                  <div>
                                    <FormControl
                                      fullWidth
                                      margin="normal"
                                      sx={{
                                        width: "250px",
                                        marginLeft: "45px",
                                        backgroundColor: "#98989C",
                                      }}
                                    >
                                      <InputLabel style={{ color: "white" }}>
                                        Default answer
                                      </InputLabel>
                                      <Select style={{ color: "white" }}>
                                        <MenuItem value="">
                                          {
                                            translations[currentLanguage]
                                              .selectLocation
                                          }
                                        </MenuItem>
                                        <MenuItem value="Warsaw">Hi</MenuItem>
                                        <MenuItem value="Cracow">Bye</MenuItem>
                                        <MenuItem value="Wroclaw">
                                          Good
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div style={{ marginTop: "15px" }}>
                                    <Textarea
                                      minRows={2}
                                      variant="outlined"
                                      sx={{
                                        marginLeft: "180px",
                                        height: "auto",
                                        width: "410px",
                                        marginBottom: "30px",
                                      }}
                                      value={commentText}
                                      onChange={(e) =>
                                        setCommentText(
                                          e.target.value
                                            .charAt(0)
                                            .toUpperCase() +
                                            e.target.value.slice(1)
                                        )
                                      }
                                    />
                                  </div>
                                  <div style={{ marginTop: "15px" }}>
                                    <button
                                      style={{
                                        background: "#98989C",
                                        color: "#163a7d",
                                        borderRadius: "16px",
                                        border: "none",
                                        height: "47px",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        width: "147px",
                                        marginRight: "46px",
                                      }}
                                      onClick={handleSubmitComment}
                                    >
                                      Send
                                    </button>
                                    <button
                                      style={{
                                        background: "#98989C",
                                        color: "#163a7d",
                                        borderRadius: "16px",
                                        border: "none",
                                        height: "47px",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        width: "150px",
                                      }}
                                      onClick={() => SetAddComment(false)}
                                    >
                                      Close comments
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                            <Close
                              key={report.id}
                              onClick={() => {
                                SetAddComment(false);
                                setShowReportSender({ id: "", showSender: "" });
                              }}
                              text="Close"
                            />
                          </ReportElementContainer>
                        )}
                      </>
                    ))}
                  </ReportContainer>
                </>
              )}
            </>
          )}
          {userRole === "4" && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {allMessages.slice(startIndex, endIndex).map((report) => (
                <ReportElementContainer
                  key={report.id}
                  initialHeight="20px"
                  initialWidth="500px"
                  id={report.id}
                  value={report.value}
                  scale={1.1}
                >
                  <BioContainer bio={report.bio} subject={report.subject} />
                  <DateOfSending timestamp={report.timestamp} />
                  <Open
                    key={report.id}
                    onClick={() =>
                      setShowReportSender({
                        id: report.id,
                        showSender: true,
                      })
                    }
                    text="Open"
                  />
                </ReportElementContainer>
              ))}
            </div>
          )}
          {showreportSender.showSender !== true && (
            <Pagination
              count={Math.ceil(
                Math.max(filteredMessages.length, allMessages.length) /
                  itemsPerPage
              )}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ marginTop: "200px", marginLeft: "48%" }}
            />
          )}
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
    </NewReportContainer>
  );
};

export default NewReport;
