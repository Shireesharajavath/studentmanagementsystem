const googleTrends = require('google-trends-api');


function aggregateMonthly(timelineData, startTime, endTime) {
  const monthly = {};
  const counter = {};

  timelineData.forEach(item => {
    const date = new Date(item.time * 1000);

   
    if (startTime && date < startTime) return;
    if (endTime && date > endTime) return;

    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthly[yearMonth]) {
      monthly[yearMonth] = 0;
      counter[yearMonth] = 0;
    }

    monthly[yearMonth] += item.value[0];
    counter[yearMonth] += 1;
  });

  return aggregateMonthlyToArray(monthly, counter);
}

function aggregateMonthlyToArray(monthly, counter) {
  const result = [];
  for (const ym in monthly) {
    result.push({ date: ym, value: monthly[ym] / counter[ym] });
  }
  return result;
}

async function getGoogleTrends(keyword, startTime, endTime) {
  try {
    if (!startTime) startTime = new Date('2025-01-01');
    if (!endTime) endTime = new Date();

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: startDate,
      endTime: endDate,
    });

    if (!results.startsWith('{')) {
      throw new Error('Non-JSON response received from Google Trends API');
    }

    const parsed = JSON.parse(results);
    const timelineData = parsed.default.timelineData;

    return {
      success: true,
      data: aggregateMonthly(timelineData, startDate, endDate)
    };

  } catch (error) {
    console.error("Google Trends Error:", error);
    return {
      success: false,
      error: `Error fetching Google Trends data: ${error.message}`
    };
  }
}

async function getGoogleTrendsForMultipleKeywords(
  keywords,
  startTime = null,
  endTime = null
) {
  const finalResults = {};

  for (const keyword of keywords) {
    try {
      const data = await getGoogleTrends(keyword.trim(), startTime, endTime);

      if (data.success) {
        finalResults[keyword] = {
          success: true,
          data: data.data
        };
      } else {
        finalResults[keyword] = {
          success: false,
          error: data.error || "Unknown error"
        };
      }

      console.log(`Fetched trends for keyword: ${keyword}`);
      console.log("waiting for 10 seconds before next keyword...");
      await new Promise(resolve => setTimeout(resolve, 10000));

    } catch (error) {
      console.error(`Error fetching trends for keyword "${keyword}":`, error.message);
      finalResults[keyword] = {
        success: false,
        error: error.message
      };
    }
  }

 
  return {
    success: true,
    results: finalResults
  };
}


module.exports = {
  getGoogleTrends,
  getGoogleTrendsForMultipleKeywords,
};
