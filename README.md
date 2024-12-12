# Install environment 
1. Install NodeJS
2. Install Visual Studio Code
# Install & start project
1. npm install
2. ipconfig lấy Ipv4 network
3. Vào file .env đổi EXPO_PUBLIC_VITE_BASE_URL bằng địa chỉ tương ứng
4. npm run dev
# Git commands step
**1.First config**
  -   git config --global core.autocrlf true
  -   git config --global user.name ""
  -   git config --global user.email ""
## Git commands step

 1.  First config
-   git config --global core.autocrlf true
-   git config --global user.name ""
-   git config --global user.email ""
2. When adding new feature
- Bắt đầu coding chức năng, lấy code mới nhất từ nhánh main
	-   git checkout main
	-   git pull
- Tách nhánh từ nhánh main
	- git checkout -b add-login-page
- Commit code để lưu trữ và theo dõi thay đổi
	- git commit -m'comment'
- Trong quá trình code, để lấy code mới nhất từ nhánh main, sử dụng lệnh rebase
	- git checkout main
	-   git pull
	-   git checkout nhanh-dang-dev Nếu chưa commit những thay đổi, cần commit trước khi rebase
	-   git rebase main
- Trước khi merge code vào main, nên rebase trước khi tạo pull request. Push nhánh hiện tại lên github và truy cập trang github để tạo pull request
	-   git push -u origin add-login-page
- Sau khi merge, thực hiện tại bước 1. Một số lệnh bổ sung
	-   git branch -d add-login-page // xóa nhánh cũ
	-   [https://rogerdudler.github.io/git-guide/](https://rogerdudler.github.io/git-guide/)
- Fetch all
	-   git fetch --all -p
## Extensions - VSCode
-   Prettier - Code formatter
-   Git Graph
-   Auto Rename Tag
-   Auto Close Tag
-   CSS Peek
-   S7+ React/Redux/React-Native snippets
-   IntelliCode
-   ESLint
-   GitLens
## Documentation
### OData
-   [https://learn.microsoft.com/en-us/odata/concepts/queryoptions-overview](https://learn.microsoft.com/en-us/odata/concepts/queryoptions-overview)
-   [https://docs.oasis-open.org/odata/odata/v4.01/cs01/part2-url-conventions/odata-v4.01-cs01-part2-url-conventions.html#sec_SystemQueryOptionfilter](https://docs.oasis-open.org/odata/odata/v4.01/cs01/part2-url-conventions/odata-v4.01-cs01-part2-url-conventions.html#sec_SystemQueryOptionfilter)
