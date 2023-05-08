import Application from "../models/applicationModel";
import { uploadToCloud } from "../helper/cloud";
import sendEmail from "../helper/sendEmail";
import Programs from "../models/programModel";

// create a new application
export const createApplication = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        status: "fail",
        mssage: "CV/Resume  is  required  field",
      });

    const result = await uploadToCloud(req.file, res);
    const program = await Programs.findOne({ title: "KLab Startups Academy" });

    const application = new Application({
      email: req.body.email,
      fullname: req.body.fullname,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      agerange: req.body.agerange,
      cohort: program.cohort,
      country: req.body.country,
      province: req.body.province,
      district: req.body.district,
      areyougraduate: req.body.areyougraduate,
      educationlevel: req.body.educationlevel,
      fieldofstudy: req.body.fieldofstudy,
      categoryfitin: req.body.categoryfitin,
      schoolfrom: req.body.schoolfrom,
      yearstudy: req.body.yearstudy,
      areyoudev: req.body.areyoudev,
      skillyouwantjoin: req.body.skillyouwantjoin,
      skilldesc: req.body.skilldesc,
      gitlink: req.body.gitlink,
      linkedinlink: req.body.linkedinlink,
      profile: result.secure_url,
      entInnovationdesc: req.body.entInnovationdesc,
      shareInnovationModel: req.body.shareInnovationModel,
    });

    sendEmail(
      '"No-Reply" <no-reply@gmail.com>',
      req.body.email,
      "Application Submitted: Confirmation Received",
      `
      <html>
        <head>
        <meta charset="utf-8" />
        <title>Application Submitted: Confirmation Received</title>
        </head>
        <body>
        <p>Dear ${req.body.fullname},</p>
        <p>Thank you for submitting your application for the Klab TechUpSkills program. We have received your application and it is currently being reviewed by our admissions team.</p>
        <p>If you have any questions about the application process or the program, please do not hesitate to contact us at klabtechupsills@gmail.com.</p>
    <p>Sincerely,</p>
    <p>The Klab TechUpSkills Team</p>
  </body>
</html>
  `
    );

    await application.save();
    return res.status(201).json({
      message: "Application created successfully!",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to create application." });
  }
};

// get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const onlineApproval = async (req, res) => {
  try {
    const filter = { status: "pending" }; // update all documents with status 'pending'
    const update = { $set: { status: "online" } }; // set the new status
    const options = { multi: true };

    await Application.updateMany(filter, update, options);

    const allApplicant = await Application.find();

    const program = await Programs.findOne({ title: "KLab Startups Academy" });

    allApplicant.forEach((single) => {
      const startDate = new Date(program.startDate);
      const formattedStartDate = `${startDate.toLocaleString("default", {
        month: "long",
      })} ${startDate.getDate()}, ${startDate.getFullYear()}`;
      sendEmail(
        "klabtechupskills@gmail.com",
        single.email,
        "Klab TechUpSkills Application Accepted",
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Klab TechUpSkills Application Accepted</title>
    <style>
        :root {
            --brand-1: #B9930B;
            --brand-blue: #3F3F3D;
            --brand-2: #87949f;
            --brand-3: #808284;
            --brand-dark: #1d1d1d;
            --brand-white: #fbfbfe;
            --back:#F2F8FF;
            --font-normal: 'Alegreya', serif;
            --font-fancy: 'Architects Daughter', cursive;
        }
        
        body {
            background-color: var(--back);
            font-family: var(--font-normal);
        }
        
        h1 {
            color: var(--brand-blue);
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            color:#3F3F3D;
        }    
        hr {
            border: none;
            height: 2px;
            background-color: #3F3F3D;
            margin: 20px 0;
        } 
        p {
            font-size: 16px;
            color: var(--brand-3);
            line-height: 1.5;
        }
        
        p.success {
            color: green;
            font-weight: bold;
        }
        
        p.date {
            color: var(--brand-blue);
            font-weight: bold;
            font-size:18px;
        }
    </style>
</head>
<body>
    <div style="padding: 20px;">
        <h1>Klab TechUpSkills</h1>
        <hr>
        <p>Dear Applicant,</p>
        <p>We are pleased to inform you that your application to Klab TechUpSkills cohort ${program.cohort} has been <span class="success">accepted</span>.</p>
        <p>You will be attending an online phase of one month starting from <span class="date">${formattedStartDate}</span>. After the online phase, we will assess your progress and determine whether you will progress to the physical training phase.</p>
        <p>Please note that you will receive further instructions and details about the online phase via email.</p>
        <p>Congratulations again on being accepted to the Klab TechUpSkills program!</p>
        <br>
        <p>Best regards,</p>
        <p>The Klab TechUpSkills Team</p>
    </div>
</body>
</html>
`
      );
    });
    return res.status(200).json({
      status: "success",
      updated: allApplicant,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const physicalApproval = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Programs.findOne({ title: "KLab Startups Academy" });
    const startDate = new Date(program.startDate);
    const nowDate = new Date();
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // one month in milliseconds

    // if (!(startDate.getTime() - nowDate.getTime() >= oneMonth)) {
    //   return res.status(403).json({
    //     status: "failed",
    //     message: "wait a online program to complete",
    //   });
    // }

    const applicant = await Application.findByIdAndUpdate(
      id,
      {
        status: "physical",
      },
      { new: true }
    );
    if (!applicant) {
      return res.status(404).json({
        status: "failed",
        message: "application not  found",
      });
    }
    sendEmail(
      "klabtechupskills@gmail.com",
      applicant.email,
      "Congratulations! You've been accepted for physical training at KLab TechUpSkills",
      `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Physical Training Acceptance Letter</title>
        <style>
            :root {
                --brand-1: #B9930B;
                --brand-blue: #3F3F3D;
                --brand-2: #87949f;
                --brand-3: #808284;
                --brand-dark: #1d1d1d;
                --brand-white: #fbfbfe;
                --back:#F2F8FF;
                --font-normal: 'Alegreya', serif;
                --font-fancy: 'Architects Daughter', cursive;
            }
            body {
                background-color: var(--back);
                color: var(--brand-dark);
                font-family: var(--font-normal);
                font-size: 16px;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            h1, h2, h3, h4, h5, h6 {
                font-family: var(--font-fancy);
                color: var(--brand-blue);
                margin-top: 0;
            }
            .container {
                max-width: 700px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid var(--brand-3);
            }
            .logo {
                display: block;
                margin: 0 auto;
                max-width: 100px;
            }
            .message {
                margin-top: 20px;
                padding: 20px;
                background-color: var(--brand-white);
                border: 1px solid var(--brand-3);
            }
            .message h2 {
                margin-top: 0;
            }
            .message p {
                margin-bottom: 0;
            }
            .message .site {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://klab.rw/sitestatic/images/klab_card_final.png" alt="KLab Logo" class="logo">
            <div class="message">
                <h2>Congratulations!</h2>
                <p>We are pleased to inform you that you have been accepted for physical training at KLab TechUpSkills in cohort ${program.cohort}.</p>
                <p>Your training will last for three months and will cover one of the following areas:</p>
                <ol>
                    <li>Frontend development</li>
                    <li>Backend development</li>
                    <li>Mobile development</li>
                </ol>
                <p>We will contact you shortly to let you know which site you will be assigned to: Kigali, Huye, or Musanze. You will also be notified of your start date, which is expected to be within the next two weeks.</p>
                <p>During your training, you will have the opportunity to work with some of the most popular programming languages and frameworks in the industry.</p>
                <p>If you have any questions, please do not hesitate to contact us at <a href="mailto:klabtechupskills@gmail.com">klabtechupskills@gmail.com</a>.</p>
                <p>Thank you for choosing KLab TechUpSkills. We look forward to helping you advance your career.</p>
                <p>Sincerely,</p>
                <p>The KLab TechUpSkills Team</p>
            </div>
            </body>
            `
    );
    return res.status(200).json({
      status: "success",
      message: "Accepted to do physical",
      data: applicant,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const waitingApproval = async (req, res) => {
  try {
    const applicant = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: "waiting",
      },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({
        status: "failed",
        message: "application not  found",
      });
    }
    sendEmail(
      "klabtechupskills@gmail.com",
      applicant.email,
      "Update on Your KLabTechUpSkills Physical Training Application - You're on the Waiting List",
      `
      <!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>KLabTechUpSkills Training - Waiting List</title>
	<style>
		:root {
			--brand-1: #B9930B;
			--brand-blue: #3F3F3D;
			--brand-2: #87949f;
			--brand-3: #808284;
			--brand-dark: #1d1d1d;
			--brand-white: #fbfbfe;
			--back:#F2F8FF;
			--font-normal: 'Alegreya', serif;
			--font-fancy: 'Architects Daughter', cursive;
		}
		body {
			font-family: var(--font-normal);
			background-color: var(--back);
			padding: 20px;
			color: var(--brand-blue);
		}
		h1 {
			font-family: var(--font-fancy);
			font-size: 2.5em;
			color: var(--brand-1);
			margin: 0 0 10px;
		}
		p {
			margin: 10px 0;
			font-size: 1.2em;
		}
		ul {
			margin: 10px 0;
			padding-left: 20px;
			list-style: disc;
			font-size: 1.2em;
		}
		li {
			margin: 5px 0;
		}
		a {
			color: var(--brand-1);
			text-decoration: none;
		}
	</style>
</head>
<body>
	<h1>KLabTechUpSkills Training - Waiting List</h1>
	<p>Dear applicant,</p>
	<p>We regret to inform you that we are unable to offer you a place on the upcoming physical training for KLabTechUpSkills. However, we are pleased to inform you that you have been placed on the waiting list in case a place becomes available.</p>
	<p>The waiting list is prioritized by the order of the applications received. If a place becomes available, we will contact you immediately with further instructions.</p>
	<p>We appreciate your interest in KLabTechUpSkills and encourage you to continue your learning journey through our online resources.</p>
	<ul>
		<li><a href="https://www.w3schools.com/default.asp">Online Resources</a></li>
		<li><a href="https://www.youtube.com/@freecodecamp">Online Courses</a></li>
	</ul>
	<p>If you have any further questions, please do not hesitate to contact us at klabtechupskills@gmail.com.</p>
	<p>Best regards,</p>
	<p>The KLabTechUpSkills Training Team</p>
</body>
</html>

      `
    );
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
export const rejectPhysical = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Programs.findOne({ title: "KLab Startups Academy" });
    const startDate = new Date(program.startDate);
    const nowDate = new Date();
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // one month in milliseconds

    // if (!(startDate.getTime() - nowDate.getTime() >= oneMonth)) {
    //   return res.status(403).json({
    //     status: "failed",
    //     message: "wait a online program to complete",
    //   });
    // }
    const applicant = await Application.findByIdAndUpdate(
      id,
      {
        status: "rejected",
      },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({
        status: "failed",
        message: "application not  found",
      });
    }
    sendEmail(
      "klabtechupskills@gmail.com",
      applicant.email,
      "Application Rejection for KLab TechUpSkills Program",
      `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Application Rejected</title>
    <style>
      :root {
        --brand-1: #b9930b;
        --brand-blue: #3f3f3d;
        --brand-2: #87949f;
        --brand-3: #808284;
        --brand-dark: #1d1d1d;
        --brand-white: #fbfbfe;
        --back: #f2f8ff;
        --font-normal: "Alegreya", serif;
        --font-fancy: "Architects Daughter", cursive;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: var(--font-normal);
        color: var(--brand-dark);
        background-color: var(--back);
        line-height: 1.5;
      }

      h1,
      h2,
      h3 {
        margin: 0;
        font-family: var(--font-fancy);
        color: var(--brand-1);
      }

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 2rem;
      }

      .container {
        max-width: 600px;
        margin: auto;
        padding: 2rem;
      }

      p {
        margin: 0;
        padding: 1rem 0;
      }

      .rejected {
        background-color: #ffcdd2;
        padding: 1rem;
        border-radius: 5px;
      }

      .rejected p {
        color: #b71c1c;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Application Rejected</h1>
      <p>We regret to inform you that your application for KLab TechUpSkills has been rejected.</p>
      <p>Unfortunately, based on your performance during the online course, we have determined that you are not yet ready to move forward to the physical training stage.</p>
      <p>We appreciate your interest in KLab TechUpSkills and encourage you to continue learning and developing your skills to join the future cohort.</p>
      <div class="rejected">
        <p>Note:</p>
        <p>Your performance did not meet the required standards to proceed to the physical training stage.</p>
      </div>
    </div>
  </body>
</html>

`
    );
    return res.status(200).json({
      status: "success",
      message: "rejection success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await Application.deleteMany();
    return res.status(200).json({
      status: "success",
      message: "Application deleted success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
// get a single application by id
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update an existing application by id
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// delete an existing application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
    } else {
      res.status(200).json({ success: true, data: application });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
