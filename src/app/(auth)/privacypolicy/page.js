"use client"
import { Container, Typography, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" gutterBottom>
          Welcome to SplitTally! Your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your personal data when you use
          our app.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" gutterBottom>
          - <strong>Account Information:</strong> Name, email address, and password.
          <br />- <strong>Transaction Data:</strong> Details of expenses shared within groups.
          <br />- <strong>Usage Data:</strong> Information on how you interact with the app.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use your data to:
          <br />- Facilitate expense tracking and settlement.
          <br />- Improve user experience and provide customer support.
          <br />- Ensure the security of our platform.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Data Sharing & Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          - We <strong>do not</strong> sell or share your data with third parties for marketing purposes.
          <br />- Your transactions are private within your group.
          <br />- We use encryption and security measures to protect your data.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Privacy Mode
        </Typography>
        <Typography variant="body1" gutterBottom>
          - When enabled, transactions marked as private will not be visible to other group members.
          <br />- Toggling privacy mode is limited to <strong>3 times per month</strong> per group.
          <br />- Group history will log when privacy mode is changed.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Data Retention & Deletion
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Your transaction history is stored for <strong>two months</strong> for spending analysis.
          <br />- You can request data deletion by contacting us.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Changes to This Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may update this policy, and we will notify users of significant changes.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body1">
          For any privacy-related questions, reach out to <strong>[ support@splittally.com]</strong>.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
