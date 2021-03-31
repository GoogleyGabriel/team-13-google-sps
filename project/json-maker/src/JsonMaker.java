
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
* Date : 03/30/2021
*/
import com.google.gson.*;
import java.util.HashMap;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class JsonMaker {

  public static void main(String[] args) {
    try {
      // getting user input for path
      Scanner in = new Scanner(System.in);
      // my setup's path, for example (Sam)
      // "/home/sam/googlesps/team-13-google-sps/project/chrome-extension/test.json"
      System.out.print("Please type the desired path to save the json file > ");
      String jsonFileName = in.nextLine();
      in.close();
      // construct json file
      Gson gson = new Gson();
      HashMap<String, Word> wordMap = new HashMap<>();

      // TODO (Instead of doing simple tests read from text files, but this was
      // a useful proof of concept; Should be done by 03/30/21)
      Word covid = new Word("test1", "test2", new String[] { "test3", "test4" });
      wordMap.put("covid", covid);
      System.out.println(gson.toJson(wordMap));

      // write to json file
      File words = new File(jsonFileName);
      FileWriter fwriter = new FileWriter(words);
      gson.toJson(wordMap, fwriter);
      fwriter.close();
    } catch (FileNotFoundException f) {
      System.out.println("We could not find the path, please try again.");
    } catch (IOException e) {
      System.out.println("Uh oh, something went wrong.");
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
    private String[] URL;

    public Word(String description, String image, String[] URL) {
      this.description = description;
      this.image = image;
      this.URL = URL;
    }

  }
}
