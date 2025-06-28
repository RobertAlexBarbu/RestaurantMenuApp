using System.Text;
using WebAPI.Application.DTO.Chat;
using WebAPI.Infrastructure.LLM;

namespace WebAPI.Application.Services.ChatService;

public class ChatService(ILlmService llmService) : IChatService
{
    public async Task<MessageDto> AskQuestionAsync(AskQuestionDto askQuestionDto)
    {
        var prompt = BuildPromptWithContext(askQuestionDto, askQuestionDto.Context);
        var response = await llmService.SendPromptAsync(prompt);
        return new MessageDto()
        {
            Text = response
        };
    }




    private string BuildPromptWithContext(AskQuestionDto askQuestionDto, string? context)
    {
        return BuildPromptInternal(askQuestionDto, context);
    }

    private string BuildPromptInternal(AskQuestionDto askQuestionDto, string? context = null)
    {
        var promptBuilder = new StringBuilder();

        promptBuilder.AppendLine(context != null
            ? "\"PROMPT: You are a helpful AI assistant that works for a restaurant. Your role is to make food and drink recommendations to customers based on the visible menu items. \n\nIMPORTANT FORMATTING RULES:\n1. Only recommend items and categories marked as isVisible = true\n2. When recommending an item, display it in EXACTLY this format where idProp is the .id property of one of the items from the context:\n<Item>\nItemId={idProp}\nItemName={itemName}\nItemDescription={itemDescription}\nItemCategory={itemCategory}\nItemPrice={itemPrice}\n</Item>\n\n3. Each item component must be on its own line between the <Item> tags\n4. Do not include any additional text or commentary within the <Item> tags\n5. Outside of the <Item> tags, you can speak naturally as a server would to a customer\n\nFor example, if recommending a burger, your response should look like:\n'May I recommend our delicious burger? Here are the details:\n<Item>\nItemName=Classic Cheeseburger\nItemDescription=Juicy beef patty with cheddar cheese on a brioche bun\nItemCategory=Main Courses\nItemPrice=$12.99\n</Item>'\n\nIf no visible items match the request, respond politely as a server would, for example: 'I'm sorry, we don't have that available right now. May I suggest something else?When someone asks for more details about an item, display the <Item> tag and then also talk a bit about the other details that are note included in the tag. IF THE USER HAS SOME QUESTIONS ANSWER THEM and reccomend food accordingly. RECOMMEND AT LEAST ONE ITEM IN THE <Item> FORMAT, BUT IF U JUST RECOMMNENDED IT ANd THE QUESTION IS RELATED TO THE RECOMMENDED  ITEM, u DONT NEED TO DISPALAY THE <Item> AGAIN! U CAN RECOMMEND MORE!.! IF YOU JUST RECOMENDED AN ITEM, AND U GET A QUESTION LIKE 'DOES IT HAVE DAIRY' THE QUESTION FOR SURE IS ABOUT THE PREVIOUSLY RECOMMENDED ITEM, NOT ABOUT ALL ITEMS'\""
            : "PROMPT: You are a helpful AI assistant. Answer the user's question based on the conversation history provided.");
        promptBuilder.AppendLine();

        if (context != null)
        {
            promptBuilder.AppendLine("CONTEXT:");
            promptBuilder.AppendLine(context);
            promptBuilder.AppendLine();
        }

        if (askQuestionDto.ChatHistory.Any())
        {
            promptBuilder.AppendLine("CONVERSATION HISTORY:");
            var orderedMessages = askQuestionDto.ChatHistory.OrderBy(m => m.CreatedAt)
                .TakeLast(5) 
                .ToList();
            foreach (var message in orderedMessages)
            {
                promptBuilder.AppendLine($"Time: {message.CreatedAt:yyyy-MM-dd HH:mm:ss}");
                if (message.IsAI)
                {
                    promptBuilder.AppendLine($"AI: {message.Text}");
                }
                else
                {
                    promptBuilder.AppendLine($"User: {message.Text}");
                }
                promptBuilder.AppendLine();
            }
        }

        promptBuilder.AppendLine("CURRENT QUESTION TO ANSWER:");
        promptBuilder.AppendLine(askQuestionDto.Question);
        promptBuilder.AppendLine();
        if (context != null)
            promptBuilder.AppendLine(
                "Answer the question based on the provided context and conversation history. If the context doesn't contain relevant information, say so instead of making up an answer.");
        return promptBuilder.ToString();
    }
}