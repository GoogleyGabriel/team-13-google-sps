
/**
* JsonMaker reads from several text files that show information about selected
* words in popular topics where misinformation is prevelant. List of words,
* word facts, images, and source URLs for the words chosen are organized in
* their respective files. JsonMaker transforms this data into a easy-to-read
* and manage JSON file, for example:
* {
*   "covid": {
*     "description": "People of any age, even healthy young adults and children, can get COVID-19. Risk for severe illness with COVID-19 increases with age, with older adults at highest risk. Certain medical conditions can also increase risk for severe illness.",
*     "image": "/images/covid.png",
*     "URL": [
*       "https://www.cdc.gov/coronavirus/2019-ncov/your-health/need-to-know.html",
*       "https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/older-adults.html"
*     ]
*   },
*   "climate change": {
*     "description": "People who study Earth see that Earth's climate is getting warmer. Earth's temperature has gone up about one degree Fahrenheit in the last 100 years. This may not seem like much. But small changes in Earth's temperature can have big effects.",
*     "image": "/images/climate-change.png",
*     "URL": [
*       "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-climate-change-k4.html",
*       "https://climate.nasa.gov/news/3072/direct-observations-confirm-that-humans-are-throwing-earths-energy-budget-off-balance/"
*     ]
*   },
*   ... more words ...
* }
*
*
* @author : Samuel Rodriguez (samuelrprofessional@gmail.com)
* Date : 04/01/2021
*/
import com.google.gson.Gson;
import java.util.HashMap;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.ArrayList;

public class JsonMaker {

  /** [wordMap] is the HashMap (k1-> v1, k2-> v2, ..., kn-> vn) such that
   * ki is a fact word from [wordF] that will map to vi that is a [Word] 
   * containing facts, image source paths, and urls of fact sources from [factF],
   * [imageF], and [urlsF] for 1 <= i <= n, respectively. Each file should be 
   * delimited by empty newlines and ordered according to the listing of words 
   * in [wordF]. Requires that all words in [wordF] have at least one of 
   * everything: fact, image source, and url.
   * 
   * @param wordF : The file containining words to map
   * @param factF : The file containing facts for every word in [wordF]
   * @param imageF : The file containing image paths for every word in [wordF]
   * @param urlsF : The file containing all URLs for every word in [wordF]
   */
  public static HashMap<String, Word> wordMap(File wordF, File factF, File imageF, File urlsF) {
    try {
      Scanner word_rd = new Scanner(wordF);
      HashMap<String, Word> wordMap = new HashMap<>();
      // organizes which scanner sets what field in [Word]
      HashMap<String, Scanner> scanInfo = new HashMap<>();
      scanInfo.put("description", new Scanner(factF));
      scanInfo.put("image", new Scanner(imageF));
      scanInfo.put("url", new Scanner(urlsF));
      String word = "";
      Word aWord = new Word();
      boolean hasNextInfo = true;
      StringBuilder val = new StringBuilder();
      String nextline = "";
      while (word_rd.hasNextLine()) {
        word = word_rd.nextLine();
        for (String info : scanInfo.keySet()) {
          while (scanInfo.get(info).hasNextLine() && hasNextInfo) {
            nextline = scanInfo.get(info).nextLine();
            val.append(nextline);
            if (nextline.equals(""))
              hasNextInfo = false;
            else if (info.equals("url"))
              aWord.addUrl(nextline);
            else
              aWord.setInfo(info, val.toString());
          }
          hasNextInfo = true;
          val = new StringBuilder();
        }

        wordMap.put(word, aWord);
        aWord = new Word();
      }
      word_rd.close();
      return wordMap;

    } catch (Exception e) {
      System.out.println("Error occurred while trying to read files");
      e.printStackTrace();
      return null;
    }
  }

  public static void main(String[] args) {
    try {
      String jsonFileName = "project/chrome-extension/words.json";
      // construct json file
      Gson gson = new Gson();
      File word = new File("project/json-maker/word-info/words.txt");
      File fact = new File("project/json-maker/word-info/facts.txt");
      File image = new File("project/json-maker/word-info/image-src.txt");
      File urls = new File("project/json-maker/word-info/urls.txt");
      HashMap<String, Word> wordMap = wordMap(word, fact, image, urls);
      // write to json file
      File wordsInJson = new File(jsonFileName);
      FileWriter fwriter = new FileWriter(wordsInJson);
      gson.toJson(wordMap, fwriter);
      fwriter.close();
    } catch (FileNotFoundException f) {
      System.out.println("We could not find the file path, please try again.");
    } catch (IOException e) {
      System.out.println("Uh oh, something went wrong while writing to the file words.json.");
      e.printStackTrace();
    }

  }

  private static class Word {
    /**
     * Word is a container that stores a fact word's fact description, image source
     * path, and list of URLs of additional sources for more information about the
     * topic of the word.
     * 
     * Used in conjuction with JsonMaker to make JSONs easily.
     */
    /** [description] is the fact description for the fact word. */
    private String description;

    /** [image] is the source path to the image. */
    private String image;

    /** [URL] is the list of URLs that fact descriptions are gathered. */
    private ArrayList<String> URL = new ArrayList<>();

    public Word() {
    }

    /** [setInfo info] assigns the value [val] to field [info]. */
    public void setInfo(String info, String val) {
      if (info.equals("description"))
        description = val;
      else if (info.equals("image"))
        image = val;
      else if (info.equals("url"))
        addUrl(val);
    }

    /** [addUrl url] appends the value [url] to [URL]  */
    public void addUrl(String url) {
      URL.add(url);
    }

  }

}
