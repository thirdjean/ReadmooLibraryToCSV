// 用戶自訂區 (Temporarily cancelled)
// let userAPCode = '78lpAR'; // 可改成自己的AP號碼
let partialBookName = '停止輸出處書名（部分書名也可）'; // 停止輸出處書名（部分書名也可）。這本書與更之前買的書不會被輸出。

let scrapeMode = 2; //1 = lite; 2=full ; 3=full+
//Lite: 書名	狀態	閱讀進度	書本URL	書名副標	作者    標籤
//Full: 書名	狀態	閱讀進度	書本URL	書名副標	作者	標籤    出版社	開始日期	結束日期	總閱讀時數	上次閱讀日期
//Full+:書名	狀態	閱讀進度	書本URL	書名副標	作者	標籤    出版社	開始日期	結束日期	總閱讀時數	上次閱讀日期	ISBN	字數	出版日期


// Default filename root
let filenameRoot = '';

// Set Base file name
switch (scrapeMode){ 
    case 1: 
        filenameRoot = 'allBooks_lite'; // Lite mode
        break;
    case 2: 
        filenameRoot = 'allBooks_full'; // Full mode
        break;
    case 3: 
        filenameRoot = 'allBooks_fullplus'; // Full+ mode
        break;
    default: 
        filenameRoot = 'allBooks_'; 
        break;
}
//Initialize the bookDataMap
const bookDataMap = new Map();

// Function to save the scraped data into a CSV file
console.save = function(data) {
    if (!data) {
        console.error('Console.save: No data');
        return;
    }

    // Generate the timestamp in 'YYYYMMDD_HHmm' format
    let now = new Date();
    let timestamp = now.getFullYear().toString() + 
                    (now.getMonth() + 1).toString().padStart(2, '0') + 
                    now.getDate().toString().padStart(2, '0') + '_' + 
                    now.getHours().toString().padStart(2, '0') + 
                    now.getMinutes().toString().padStart(2, '0');

    // Generate the full filename with the timestamp
    let filename = `${filenameRoot}_${timestamp}.csv`;

    console.log("data[1]:" + Object.keys(data[1]));
    console.log("Number of items in data:", data.length);

    let csvContent = ""; // Set CSV file headers
    switch (scrapeMode){
        case 1: // Lite mode
            console.log("Checkpoint 3");
            console.log("Starting to export Lite mode CSV");

            csvContent = "書名,狀態,閱讀進度,書本URL,書名副標,作者,標籤" + '\n'; // Headers for lite mode

            data.forEach(function(row) {
                csvContent +=   '"' + (row.Title || '-').replace(/"/g, '""') + '",' +            // 書名 [Grid]
                                '"' + (row.Status || '-').replace(/"/g, '""') + '",' +           // 狀態 [Grid] e.g. "尚未開始", "閱讀完畢"
                                '"' + (row.ReadingPercent || '-').replace(/"/g, '""') + '",' +   // 閱讀進度% [Grid]
                                '"' + (row.BookURL || '-').replace(/"/g, '""') + '",' +          // 書本URL [List]
                                '"' + (row.TitleSubheading || '-').replace(/"/g, '""') + '",' +        // 書名副標 [List]
                                '"' + (row.Author || '-').replace(/"/g, '""') + '",' +           // 作者 [List]
                                '"' + (row.Tags || '-').replace(/"/g, '""') + '"\n';             // 標籤 [List]
            });
            break;

        case 2: // Full mode
            csvContent = "書名,狀態,閱讀進度,書本URL,書名副標,作者,標籤,出版社,開始日期,結束日期,總閱讀時數,上次閱讀日期" + "\n"; // Headers for full mode
            
            data.forEach(function(row) {
                csvContent +=   '"' + (row.Title || '-').replace(/"/g, '""') + '",' +            // 書名 [Grid]
                                '"' + (row.Status || '-').replace(/"/g, '""') + '",' +           // 狀態 [Grid]
                                '"' + (row.ReadingPercent || '-').replace(/"/g, '""') + '",' +   // 閱讀進度% [Grid]
                                '"' + (row.BookURL || '-').replace(/"/g, '""') + '",' +          // 書本URL [List]
                                '"' + (row.TitleSubheading || '-').replace(/"/g, '""') + '",' +        // 書名副標 [List]
                                '"' + (row.Author || '-').replace(/"/g, '""') + '",' +           // 作者 [List]
                                '"' + (row.Tags || '-').replace(/"/g, '""') + '",' +             // 標籤 [List]
                                '"' + (row.Publisher || '-').replace(/"/g, '""') + '",' +        // 出版社 [Modal]
                                '"' + (row.StartDate || '-').replace(/"/g, '""') + '",' +        // 開始日期 [Modal]
                                '"' + (row.EndDate || '-').replace(/"/g, '""') + '",' +          // 結束日期 [Modal]
                                '"' + (row.TotalReadingTime || '-').replace(/"/g, '""') + '",' + // 總閱讀時數 [Modal]
                                '"' + (row.LastReadingDate || '-').replace(/"/g, '""') + '"\n';  // 上次閱讀日期 [Modal]
            });

            console.log("Checkpoint 6");

            break;

        case 3: // Full+ mode

            csvContent = "書名,狀態,閱讀進度,書本URL,書名副標,作者,出版社,開始日期,結束日期,總閱讀時數,上次閱讀日期,標籤,ISBN,字數,出版日期" + "\n"; // Headers for full+ mode (TBU Jean, right now same as full mode)
            
            data.forEach(function(row) {
                csvContent +=   '"' + (row.Title || '-').replace(/"/g, '""') + '",' +            // 書名
                                '"' + (row.Status || '-').replace(/"/g, '""') + '",' +           // 狀態
                                '"' + (row.ReadingPercent || '-').replace(/"/g, '""') + '",' +   // 閱讀進度%
                                '"' + (row.BookURL || '-').replace(/"/g, '""') + '",' +          // 書本URL
                                '"' + (row.TitleSubheading || '-').replace(/"/g, '""') + '",' +        // 書名副標
                                '"' + (row.Author || '-').replace(/"/g, '""') + '",' +           // 作者
                                '"' + (row.Tags || '-').replace(/"/g, '""') + '",' +             // 標籤
                                '"' + (row.Publisher || '-').replace(/"/g, '""') + '",' +        // 出版社
                                '"' + (row.StartDate || '-').replace(/"/g, '""') + '",' +        // 開始日期
                                '"' + (row.EndDate || '-').replace(/"/g, '""') + '",' +          // 結束日期
                                '"' + (row.TotalReadingTime || '-').replace(/"/g, '""') + '",' + // 總閱讀時數
                                '"' + (row.LastReadingDate || '-').replace(/"/g, '""') + '",' +  // 上次閱讀日期
                                '"' + (row.Tags || '-').replace(/"/g, '""') + '",' +             // 標籤
                                '"' + (row.ISBN || '-').replace(/"/g, '""') + '",' +             // ISBN (TBU Jean)
                                '"' + (row.WordCount || '-').replace(/"/g, '""') + '",' +        // 字數 (TBU Jean)
                                '"' + (row.PublishDate || '-').replace(/"/g, '""') + '"\n';      // 出版日期 (TBU Jean)
            });
            break;
        
        default:
            console.log("Error: Mode needs to be set");
    }

    var blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);

    console.log(`Finished! CSV is saved. Filename: ${filename}.csv`);    
}

// Function to ensure the page is in list view
async function ensureListView() {
    const listViewButton = document.querySelector('button[data-view-type="list-view"]');
    if (listViewButton) {
        listViewButton.click();  // Click to switch to list view
        console.log("Switched to list view.");
        
        // Wait for some time to allow the page to load
        await new Promise(resolve => setTimeout(resolve, 2000));  // Adjust time as needed
    }
}


// Function to sort by 'Newest First'
async function sortByNewestFirst() {
    const sortButton = document.querySelector('i.mo.mo-sort');
    if (sortButton) {
        sortButton.click();
        console.log("Sort button clicked.");
        
        // Wait for the sorting modal to appear
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Click the '最近購買' (Newest Purchase) option
        const newestFirstOption = document.querySelector('div[data-sort="buy"]');
        if (newestFirstOption) {
            newestFirstOption.click();
            console.log("Sorted by 'Newest Purchase'.");
            
            // Wait for the sorting to be applied
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            console.log("'Newest Purchase' option not found.");
        }
    } else {
        console.log("Sort button not found.");
    }
}

// Function to load all book data in grid mode (with controlled scrolling)
async function loadAllBookDataInGridMode() {
    let foundPartialBook = false; // Flag to track if partial book name is found
    let lastScrollPosition = 0;
    let currentScrollPosition = 0;

    while (!foundPartialBook) {
        lastScrollPosition = window.scrollY;

        // Scroll down one window height (as if pressing PgDn)
        window.scrollBy(0, window.innerHeight);

        // Wait for new content to load
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update scroll position after waiting
        currentScrollPosition = window.scrollY;

        // Check if we've reached the bottom of the page
        if (currentScrollPosition >= document.body.scrollHeight - window.innerHeight) {
            console.log("Reached the bottom of the page.");
            break;
        }

        // Check for partial book name in visible books
        const books = document.querySelectorAll('.library-item.library-item-grid-view');
        for (let book of books) {
            const titleElement = book.querySelector('.info .title');
            const title = titleElement ? titleElement.textContent.trim() : '';
            if (title.includes(partialBookName)) {
                console.log(`Found the specified book: ${title}. Stopping scrolling.`);
                foundPartialBook = true; // Set flag to true
                break; // Stop checking further
            }
        }

        // Log the current state for debugging
        console.log("Current scroll position:", currentScrollPosition);
    }

    console.log("All book data (text and images) loaded.");
}

// Function to initialize books map based on grid view's amount of books
async function initializeBookDataMap() {
    // Initialize a mapping dictionary to store book data
    let bookDataMap = new Map();

    // Find all modal elements containing book data
    const modalElements = document.querySelectorAll('[role="dialog"]');
    let bookCounter = 1; // Start numbering books from 1

    for (const modal of modalElements) {
        // Find all books within this modal
        const bookElements = modal.querySelectorAll('[data-testid="book-container"]');

        for (const bookElement of bookElements) {
            // Initialize each book's properties with default values
            bookDataMap.set(bookCounter, {
                Title: '',                   // 書名
                Status: '',                  // 狀態
                ReadingPercent: '',          // 閱讀進度%
                BookURL: '',                 // 書本URL
                Tags: '',                    // 標籤
                TitleSubheading: '',               // 書名副標
                Author: '',                  // 作者
                Publisher: '',               // 出版社
                StartDate: '',               // 開始日期
                EndDate: '',                 // 結束日期
                TotalReadingTime: '',        // 總閱讀時數
                LastReadingDate: '',         // 上次閱讀日期
                ISBN: '',                    // ISBN
                WordCount: '',               // 字數
                PublishDate: ''              // 出版日期
            });

            bookCounter++; // Increment the book counter
        }
    }

    console.log(`Initialized Book Data Map with ${bookCounter - 1} entries.`);
    return bookDataMap;
}


// Function to extract book details in grid mode (lite version)
async function extractBookDetailsInGridMode(bookDataMap) {
    const books = document.querySelectorAll('.library-item.library-item-grid-view');
    console.log(`Found ${books.length} books in grid mode.`);

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // Extract Title
        const titleElement = book.querySelector('.info .title');
        const title = titleElement ? titleElement.textContent.trim() : 'Unknown Title';

        // Extract Status
        const statusElement = book.querySelector('.menu-status .btn.btn-primary.btn-block');
        const bookStatus = statusElement ? statusElement.textContent.trim() : 'N/A';

        // Extract Reading Percentage
        const ReadingPercentElement = book.querySelector('.progress .progress-bar');
        const ReadingPercent = ReadingPercentElement ? ReadingPercentElement.style.width.trim() : 'N/A';

        // Determine the Book Number (1-based index)
        const bookNumber = i + 1;

        // Use Object.assign to merge or update the existing book data
        if (bookDataMap.has(bookNumber)) {
            // Merge new properties into the existing entry
            Object.assign(bookDataMap.get(bookNumber), {
                BookNumber: bookNumber,
                Title: title,
                Status: bookStatus,
                ReadingPercent: ReadingPercent
            });
        } else {
            // Initialize a new entry in the map
            bookDataMap.set(bookNumber, {
                BookNumber: bookNumber,
                Title: title,
                Status: bookStatus,
                ReadingPercent: ReadingPercent
            });
        }

        // Log the extracted book details
        console.log(`Grid Book ${bookNumber}: Title: ${title}, Reading Percent: ${ReadingPercent}, Status: ${bookStatus}`);
    }
}

// Function to extract book details from the visible books in grid mode with modal scraping
async function extractBookDetailsInGridModeModal(bookDataMap) {
    console.log("Grid Mode Detected - Modal is Active");

    const books = document.querySelectorAll('.books .library-item');

    for (let i = 0; i < books.length; i++) {
        const book = books[i]; 
        const detailButton = book.querySelector('.detail[data-original-title="詳細"]');

        let now = new Date(); // To treat end date or start dates with "小時前" entry

        if (detailButton) {
            // Click the button to open the modal
            detailButton.click();

            // Wait until the modal and required content are available
            await new Promise(resolve => {
                const checkModalLoaded = setInterval(() => {
                    const modal = document.querySelector('.book-detail-modal');
                    const infoDiv = modal ? modal.querySelector('.col-sm-10.col-8') : null;

                    if (infoDiv) {
                        clearInterval(checkModalLoaded);  // Stop checking once the content is found
                        resolve();  // Proceed once the text element is available
                    }
                }, 100); // Check every 100ms if the modal content has loaded
            });

            // Extract the required text from the modal
            const modal = document.querySelector('.book-detail-modal');
            const infoDiv = modal.querySelector('.col-sm-10.col-8');

            // Title information (Used only if the book cannot be found in existing map data)
            const title = infoDiv.querySelector('h4').textContent.trim();

            // Extract author and publisher
            const authorAndPublisher = infoDiv.children[1].textContent.trim();
            const parts = authorAndPublisher.split(' | ');
            const publisher = parts.pop(); // Get the last element as the publisher
            const authors = parts.join(', '); // Join the remaining parts with a comma

            // Extract reading date details
            const startDateElement = Array.from(infoDiv.children).find(div => div.textContent.includes('開始閱讀'));
            const endDateElement = Array.from(infoDiv.children).find(div => div.textContent.includes('閱讀完畢'));
            const totalReadingTimeElement = Array.from(infoDiv.children).find(div => div.textContent.includes('總閱讀時數'));
            const lastReadingDateElement = Array.from(infoDiv.children).find(div => div.textContent.includes('上次閱讀'));

            let startDate = startDateElement ? startDateElement.textContent.split('：')[1].trim() : null;
            let endDate = endDateElement ? endDateElement.textContent.split('：')[1].trim() : null;
            let totalReadingTime = totalReadingTimeElement ? totalReadingTimeElement.textContent.split('：')[1].trim() : null;
            let lastReadingDate = lastReadingDateElement ? lastReadingDateElement.textContent.split('：')[1].trim() : null;
            
            if (startDate && startDate.includes("小時前")) {
                const hoursMatch = startDate.match(/(\d+)\s*小時前/);
                if (hoursMatch) {
                    now.setHours(now.getHours() - parseInt(hoursMatch[1], 10));
                    startDate = now.toISOString().slice(0, 10).replace(/-/g, '/'); // Format: YYYY/MM/DD
                }
            }

            if (endDate && endDate.includes("小時前")) {
                const hoursMatch = endDate.match(/(\d+)\s*小時前/);
                if (hoursMatch) {
                    now.setHours(now.getHours() - parseInt(hoursMatch[1], 10));
                    endDate = now.toISOString().slice(0, 10).replace(/-/g, '/'); // Format: YYYY/MM/DD
                }
            }

            if (lastReadingDate && lastReadingDate.includes("小時前")) {
                const hoursMatch = lastReadingDate.match(/(\d+)\s*小時前/);
                if (hoursMatch) {
                    now.setHours(now.getHours() - parseInt(hoursMatch[1], 10));
                    lastReadingDate = now.toISOString().slice(0, 10).replace(/-/g, '/'); // Format: YYYY/MM/DD
                }
            }         
            
            if (startDate && startDate.includes("尚未開始")) {
                startDate = null;
                totalReadingTime = null;
            }
            
            // Determine the Book Number (1-based index)
            const bookNumber = i + 1;

            // Use Object.assign to merge or update the existing book data
            if (bookDataMap.has(bookNumber)) {
                // Merge new properties into the existing entry
                Object.assign(bookDataMap.get(bookNumber), {
                    BookNumber: bookNumber,
                    Author: authors,
                    Publisher: publisher,
                    StartDate: startDate,
                    EndDate: endDate,
                    TotalReadingTime: totalReadingTime,
                    LastReadingDate: lastReadingDate
                });
            } else {
                // Initialize a new entry in the map
                bookDataMap.set(bookNumber, {
                    BookNumber: bookNumber,
                    Title: title,
                    Author: authors,
                    Publisher: publisher,
                    StartDate: startDate,
                    EndDate: endDate,
                    TotalReadingTime: totalReadingTime,
                    LastReadingDate: lastReadingDate
                });
            }

            console.log(`List Book ${bookNumber}: Title: ${title}, Author(s): ${authors}, Publisher: ${publisher},
            StartDate: ${startDate}, EndDate: ${endDate}, TotalReadingTime: ${totalReadingTime}, LastReadingDate: ${lastReadingDate}`);

            // Optional small delay between modal processing to prevent overwhelming the UI
            await new Promise(resolve => setTimeout(resolve, 200)); // Small delay, can adjust if needed
        }
    }

    // Close the final modal
    const closeButton = document.querySelector('.book-detail-modal .close');
    if (closeButton) {closeButton.click();}

    console.log("Finished extracting Book Data in Grid Mode (Modal):", Object.fromEntries(bookDataMap));
    return bookDataMap;
}


// Function to load all text data in list mode (with controlled scrolling)
async function loadAllBookDataInListMode() {
    let foundPartialBook = false; // Flag to track if partial book name is found
    let lastScrollHeight = 0;
    let currentScrollHeight = document.body.scrollHeight;

    // Continue scrolling until no more new text information is loaded or partial book name is found
    while (!foundPartialBook) {
        lastScrollHeight = currentScrollHeight;

        // Scroll to the bottom of the page to load more books
        window.scrollTo(0, document.body.scrollHeight);
        
        // Wait for new content to load (adjust delay as needed)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update the scroll height after waiting
        currentScrollHeight = document.body.scrollHeight;

        // Check for partial book name in visible books
        const libraryItems = document.querySelectorAll('.books .library-item.library-item-list-view.list-group-item');
        for (let item of libraryItems) {
            const titleElement = item.querySelector('.library-item-info .title');
            const title = titleElement ? titleElement.textContent.trim() : '';
            if (title.includes(partialBookName)) {
                console.log(`Found the specified book in list mode: ${title}. Stopping scrolling.`);
                foundPartialBook = true; // Set flag to true
                break; // Stop checking further
            }
        }

        // Log the current state for debugging
        console.log("Current scroll height:", currentScrollHeight);
        
        // Check if no more new content has been loaded
        if (lastScrollHeight === currentScrollHeight) {
            console.log("No more content to load. Stopping scrolling.");
            break; // Stop scrolling if we are at the bottom
        }
    }

    console.log("All book data loaded in list mode.");
}

// Function to extract book details from the visible books in list mode
async function extractBookDetailsInListMode(bookDataMap) {
    const libraryItems = document.querySelectorAll('.books .library-item.library-item-list-view.list-group-item');
    console.log(`Found ${libraryItems.length} books in list mode.`);

    for (let i = 0; i < libraryItems.length; i++) {
        const item = libraryItems[i];

        // Full Title
        const fullTitleElement = item.querySelector('.library-item-info .title');
        const titleFull = fullTitleElement ? fullTitleElement.textContent.trim() : 'Unknown Title';

        // Check if the title contains the partial book name
        if (titleFull.includes(partialBookName)) {
            console.log(`Found the specified book in list mode: ${titleFull}. Stopping extraction.`);
            break;
        }

        // Book URL
        const bookLinkElement = item.querySelector('.library-item-info a.reader-link');
        let bookURL = bookLinkElement ? bookLinkElement.href : 'N/A';
        if (bookURL !== 'N/A') {
            let bookNumber = bookURL.split('/').pop();
            bookURL = `https://readmoo.com/book/${bookNumber}`;
        }

        // Author
        const authorElement = item.querySelector('.library-item-info .author');
        const author = authorElement ? authorElement.textContent.trim() : 'N/A';

        // Tag
        const tagsElement = item.querySelector('.library-item-info .tags-row div');
        const tags = tagsElement ? tagsElement.textContent.replace(/標籤：/g, '').trim() : 'N/A';

        // Extract TitleSubheading
        const bookNumber = i + 1; // Book number is 1-based index

        let titleSubheading = null; // Default value for TitleSubheading
        if (bookDataMap.has(bookNumber)) {
            const bookData = bookDataMap.get(bookNumber);

            // Get the existing title from the bookDataMap
            const bookTitle = bookData.Title || '';
            console.log(`bookTitle from bookDataMap: ${bookTitle}`);
            console.log(`titleFull: ${titleFull}`);

            if (bookTitle && titleFull.startsWith(bookTitle)) {
                // Remove the book title from the full title
                let remainingTitle = titleFull.substring(bookTitle.length).trim();
                console.log(`remainingTitle: ${remainingTitle}`);

                // Remove the first "：" if it exists
                const colonIndex = remainingTitle.indexOf('：');
                console.log(`「：」colonIndex: ${colonIndex}`);
                if (colonIndex !== -1) {
                    titleSubheading = remainingTitle.substring(colonIndex + 1).trim();
                } else {
                    titleSubheading = remainingTitle; // If no colon, take remaining string
                }
                console.log(`titleSubheading: ${titleSubheading}`);
            }
        }

        // Use Object.assign to update the corresponding entry without overwriting
        if (bookDataMap.has(bookNumber)) {
            Object.assign(bookDataMap.get(bookNumber), {
                BookNumber: bookNumber,
                BookURL: bookURL,
                TitleSubheading: titleSubheading,
                Author: author,
                Tags: tags
            });
        } else {
            // Initialize new entry if not already present
            bookDataMap.set(bookNumber, {
                BookNumber: bookNumber,
                BookURL: bookURL,
                TitleSubheading: titleSubheading,
                Author: author,
                Tags: tags
            });
        }

        console.log(`List Book ${bookNumber}: Title: ${titleFull}, Title Subheading: ${titleSubheading}, Book URL: ${bookURL}, Author: ${author}`);
    }
}



// Generate CSV content from bookDataMap
function generateCSVContent(bookDataMap) {
    const dataArray = [];

    bookDataMap.forEach(function(row) {
        dataArray.push({
            Title: row.Title || '-',                   // 書名
            Status: row.Status || '-',                 // 狀態
            ReadingPercent: row.ReadingPercent || '-', // 閱讀進度%
            BookURL: row.BookURL || '-',               // 書本URL
            TitleSubheading: row.TitleSubheading || '-',           // 書名副標
            Author: row.Author || '-',                 // 作者
            Tags: row.Tags || '-',                     // 標籤
            Publisher: row.Publisher || '-',           // 出版社
            StartDate: row.StartDate || '-',           // 開始日期
            EndDate: row.EndDate || '-',               // 結束日期
            TotalReadingTime: row.TotalReadingTime || '-', // 總閱讀時數
            LastReadingDate: row.LastReadingDate || '-',   // 上次閱讀日期
            ISBN: row.ISBN || '-',                     // ISBN
            WordCount: row.WordCount || '-',           // 字數
            PublishDate: row.PublishDate || '-'        // 出版日期
        });
    });

    return dataArray;
}

// Main function to load book data and extract book details
async function scrapeData() {
    await sortByNewestFirst();            // Ensure books are sorted by newest first
    await loadAllBookDataInGridMode();    // Load all books in grid mode
    await initializeBookDataMap();        // Initialize bookDataMap using the amount of books detected

    let csvData = "";

    // Lite scrape mode: To be done for all scrape modes
    await extractBookDetailsInGridMode(bookDataMap);     // Lite scrape

    // Full & Full+ mode: Extract info from list view modals
    if(scrapeMode > 1){
        await extractBookDetailsInGridModeModal(bookDataMap);
    } 

    await ensureListView();
    await loadAllBookDataInListMode();
    await extractBookDetailsInListMode(bookDataMap);
    
    // Generate CSV content
    csvData = generateCSVContent(bookDataMap);

    // Save the data to CSV file with timestamp
    console.save(csvData);
}

// Start the scraping process
scrapeData();
