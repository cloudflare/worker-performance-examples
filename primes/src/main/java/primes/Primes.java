package primes;

import java.util.*;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

import org.json.simple.JSONObject;

import com.amazonaws.services.lambda.runtime.Context; 
import com.amazonaws.services.lambda.runtime.RequestStreamHandler; 

public class Primes implements RequestStreamHandler {

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException { 
        Random rand = new Random();

        double n = 1000000000000000.0 + (double)rand.nextInt(100000);
        List<Long> out = new ArrayList<Long>();

        for (long factor = 3; factor*factor <= n; factor++) {
            while (n % factor == 0) {
                out.add(factor);
                n = n / factor;
            }
        }

        if (n > 1) {
            out.add((long)n);
        }

        JSONObject responseJson = new JSONObject();

        responseJson.put("isBase64Encoded", false);
        responseJson.put("statusCode", 200);
        responseJson.put("headers", new JSONObject());
        responseJson.put("body", out.toString());  

        OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
        writer.write(responseJson.toJSONString());  
        writer.close();
    }
}

