# SplitTally

**SplitTally** is a web application designed to help people living in shared apartments manage common expenses transparently. Users can create groups, add members, and record shared purchases. Transactions are verified by all group members, and the system tracks who owes what. It also provides AI-powered spending analysis and automated settlements for better financial management.

## 🚀 Features

### **1. Group Expense Management**
- Create groups and invite members.
- Record shared expenses with details such as amount, payer, and description.
- Transactions are verified by all group members to maintain transparency.

### **2. Real-Time Expense Tracking**
- View an updated breakdown of who owes what within the group.
- Instantly see contributions and outstanding balances.

### **3. Automated Settlements**
- The system automatically settles expenses at the end of each month.
- Users can review the final settlements before proceeding.

### **4. Privacy Mode for Transactions**
- Users can enable privacy mode for pending transactions to hide details until verified.

### **5. AI-Powered Spending Analysis**
- Users can generate an AI-driven spending analysis report after two months.
- The report provides insights into spending patterns and suggestions for cost reduction.
- Once a report is generated, it is stored in the database to prevent duplicate API calls.
- Groups must wait one month before requesting a new report.
- Data visualization using **Chart.js** with bar graphs and comparisons.

### **6. Data Visualization**
- Spending breakdowns available in **pie charts and bar graphs**.
- Monthly expense comparisons for better financial insights.
- Planned visualization of settlements using **Sankey diagrams** or **force-directed graphs**.

### **7. Secure Authentication & User Management**
- Signup/Login with email and password.
- Google OAuth authentication using Google Cloud.

### **8. Reset Password Functionality**
- Users can request a password reset via email.
- Secure token-based password reset implementation.

### **9. Privacy Policy & Data Protection**
- A dedicated **Privacy Policy** page to outline how user data is managed and protected.
- Secure storage of transaction details and user credentials.

## 🛠️ Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Google OAuth, JWT
- **Hosting & Deployment:** Vercel
- **Data Visualization:** Chart.js
- **AI Integration:** DeepSeek AI

## 📌 How It Works
### **1. Getting Started**
1. Sign up or log in with Google or email.
2. Create a group and invite members.
3. Add expenses with descriptions and amounts.
4. Review and verify transactions.
5. Track balances and settle at the end of the month.

### **2. AI-Powered Report Generation**
- Available only after **two months** of data collection.
- Once requested, the report is stored to **avoid redundant API calls**.
- Users must wait **one month** before requesting a new report.

### **3. Privacy & Security**
- Transactions can be hidden until verified.
- Password reset tokens ensure secure recovery.
- Personal data is protected and outlined in the **Privacy Policy**.

## 🔗 Live Demo
Check out SplitTally live here: [https://split-tally.vercel.app/](https://split-tally.vercel.app/)



## 📬 Contact
For any questions or contributions, reach out via LinkedIn or open an issue in the repository!

---

**#ExpenseTracking #Nextjs #FullStackDevelopment #MongoDB #Vercel #AI #WebApp #SharedExpenses #PersonalFinance #DataVisualization**

